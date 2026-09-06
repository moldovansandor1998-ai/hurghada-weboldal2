import { createHmac, timingSafeEqual } from 'node:crypto'

const supabaseUrl = 'https://manmcuikrskjstcaqobj.supabase.co'
const publishableKey = 'sb_publishable_kvbfTNEvGdi8wOwqe9qcMw_EoDo3YMy'
const destination = 'https://hurghadaprogramok.hu/?newsletter=subscribed'

const redirect = (res, location = destination) => {
  res.statusCode = 303
  res.setHeader('Location', location)
  res.setHeader('Cache-Control', 'no-store')
  return res.end()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Csak GET kérés engedélyezett.')

  const email = String(req.query?.email || '').trim().toLowerCase()
  const issuedAt = String(req.query?.ts || '')
  const signature = String(req.query?.sig || '')
  const secret = process.env.RESEND_API_KEY

  if (!secret || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{10}$/.test(issuedAt) || !/^[a-f0-9]{64}$/i.test(signature)) {
    return redirect(res, 'https://hurghadaprogramok.hu')
  }

  const ageSeconds = Math.floor(Date.now() / 1000) - Number(issuedAt)
  if (ageSeconds < 0 || ageSeconds > 60 * 60 * 24 * 30) {
    return redirect(res, 'https://hurghadaprogramok.hu')
  }

  const expected = createHmac('sha256', secret).update(`${email}|${issuedAt}`).digest()
  const received = Buffer.from(signature, 'hex')
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return redirect(res, 'https://hurghadaprogramok.hu')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/subscribe_newsletter`, {
    method: 'POST',
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_email: email }),
  })

  if (!response.ok) {
    console.error('[Hurghada newsletter] one-click subscription failed', { status: response.status })
    return redirect(res, 'https://hurghadaprogramok.hu')
  }

  return redirect(res)
}
