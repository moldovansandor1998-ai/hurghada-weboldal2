const supabaseUrl='https://manmcuikrskjstcaqobj.supabase.co'
const key='sb_publishable_kvbfTNEvGdi8wOwqe9qcMw_EoDo3YMy'
export default async function handler(req,res){
 const token=String(req.query?.token||'')
 if(!/^[0-9a-f-]{36}$/i.test(token)) return res.status(400).send('Érvénytelen leiratkozási hivatkozás.')
 const response=await fetch(`${supabaseUrl}/rest/v1/rpc/unsubscribe_newsletter`,{
  method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({p_token:token})
 })
 if(!response.ok) return res.status(500).send('A leiratkozás most nem sikerült.')
 return res.status(200).setHeader('Content-Type','text/html; charset=utf-8').send('<h2>Sikeresen leiratkoztál.</h2><p>Nem küldünk több hírlevelet erre a címre.</p>')
}