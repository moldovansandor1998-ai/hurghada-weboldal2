import { createHmac } from 'node:crypto'

const json = (res, status, body) =>
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(body))

const supabaseUrl = 'https://manmcuikrskjstcaqobj.supabase.co'
const publishableKey = 'sb_publishable_kvbfTNEvGdi8wOwqe9qcMw_EoDo3YMy'

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;',
}[c]))

const html = (message, unsubscribeUrl, subscribeUrl) => `<!doctype html><html lang="hu"><body style="margin:0;background:#f0f9ff;font-family:Arial,sans-serif;color:#172033"><table width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px"><tr><td align="center"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#fff;border:1px solid #bae6fd;border-radius:20px"><tr><td style="padding:26px;background:#0284c7;color:#fff;text-align:center;font-size:27px;font-weight:800">Hurghada Programok ☀️</td></tr><tr><td style="padding:28px;font-size:16px;line-height:1.65">${escapeHtml(message).replace(/\n/g,'<br>')}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0"><tr><td align="center"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#f97316" style="border-radius:999px"><a href="${subscribeUrl}" style="display:block;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;white-space:nowrap">Feliratkozom és megnézem</a></td></tr></table></td></tr></table><p style="color:#64748b;border-top:1px solid #e2e8f0;padding-top:18px">Üdvözlettel:<br><strong>A Hurghada Programok csapata</strong></p><p style="font-size:12px;color:#94a3b8;text-align:center"><a href="${unsubscribeUrl}" style="color:#64748b">Leiratkozás</a></p></td></tr></table></td></tr></table></body></html>`

const subscribeLink = (email, secret) => {
  const issuedAt = Math.floor(Date.now() / 1000).toString()
  const payload = `${email}|${issuedAt}`
  const signature = createHmac('sha256', secret).update(payload).digest('hex')
  return `https://hurghadaprogramok.hu/api/subscribe-and-view?email=${encodeURIComponent(email)}&ts=${issuedAt}&sig=${signature}`
}

const dbFetch = (path, token, options = {}) => fetch(`${supabaseUrl}/rest/v1/${path}`, {
  ...options,
  headers: {
    apikey: publishableKey,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  },
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Csak POST kérés engedélyezett.' })
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token) return json(res, 401, { error: 'Jelentkezz be a Hurghada adminba.' })

  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: publishableKey, Authorization: `Bearer ${token}` },
  })
  if (!userResponse.ok) return json(res, 401, { error: 'A munkamenet lejárt. Jelentkezz be újra.' })
  const user = await userResponse.json()
  if (user?.app_metadata?.is_admin !== true) return json(res, 403, { error: 'Nincs admin jogosultság.' })

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('[Hurghada newsletter] RESEND_API_KEY missing')
    return json(res, 500, { error: 'A Hurghada levélküldő kulcsa még nincs beállítva.' })
  }

  const mode = String(req.body?.mode || '')
  const subject = String(req.body?.subject || '').trim()
  const message = String(req.body?.message || '').trim()
  if (!['test','broadcast','selected'].includes(mode)) return json(res,400,{error:'Ismeretlen küldési mód.'})
  if (!subject || !message) return json(res,400,{error:'A tárgy és az üzenet kötelező.'})

  let recipients = []
  if (mode === 'test') {
    const email = String(req.body?.email || '').trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(res,400,{error:'Adj meg érvényes tesztcímet.'})
    recipients=[{email,unsubscribe_token:null}]
  } else if (mode === 'selected') {
    const emails = Array.isArray(req.body?.emails) ? req.body.emails : []
    recipients = [...new Set(emails
      .map(email => String(email).trim().toLowerCase())
      .filter(email => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))
    )].slice(0, 100).map(email => ({ email, unsubscribe_token: null }))
  } else {
    const response=await dbFetch('newsletter_subscribers?select=email,unsubscribe_token&status=eq.active&order=created_at.asc&limit=10000',token)
    if(!response.ok) return json(res,500,{error:'A címzettek betöltése nem sikerült.'})
    recipients=await response.json()
  }
  if(!recipients.length) return json(res,400,{error:'Nincs megfelelő címzett.'})

  let sent=0
  for(let i=0;i<recipients.length;i+=50){
    const chunk=recipients.slice(i,i+50).map(r=>{
      const unsubscribeUrl=r.unsubscribe_token?`https://hurghadaprogramok.hu/api/unsubscribe?token=${encodeURIComponent(r.unsubscribe_token)}`:'https://hurghadaprogramok.hu'
      const subscribeUrl=subscribeLink(r.email,resendKey)
      return {from:'Hurghada Programok <uzenet@hurghadaprogramok.hu>',to:[r.email],subject,html:html(message,unsubscribeUrl,subscribeUrl)}
    })
    const response=await fetch(chunk.length===1?'https://api.resend.com/emails':'https://api.resend.com/emails/batch',{
      method:'POST',headers:{Authorization:`Bearer ${resendKey}`,'Content-Type':'application/json'},body:JSON.stringify(chunk.length===1?chunk[0]:chunk)
    })
    if(!response.ok){
      const detail=await response.text()
      console.error('[Hurghada newsletter] Resend failed',{status:response.status,detail})
      return json(res,502,{error:`A küldés ${sent} cím után megállt. Ellenőrizd a Hurghada feladó domaint.`})
    }
    sent+=chunk.length
  }
  if(mode==='broadcast'){
    await dbFetch(`newsletter_subscribers?email=in.(${recipients.map(r=>encodeURIComponent(r.email)).join(',')})`,token,{
      method:'PATCH',body:JSON.stringify({last_campaign_at:new Date().toISOString(),updated_at:new Date().toISOString()})
    })
  }
  return json(res,200,{ok:true,sent})
}
