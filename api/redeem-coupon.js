const json=(res,status,body)=>res.status(status).setHeader('Content-Type','application/json; charset=utf-8').send(JSON.stringify(body));
const U='https://manmcuikrskjstcaqobj.supabase.co';
const K='sb_publishable_kvbfTNEvGdi8wOwqe9qcMw_EoDo3YMy';
const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const friendlyError=(message='')=>{
  const m=String(message).toLowerCase();
  if(m.includes('invalid voucher'))return 'Érvénytelen kuponkód.';
  if(m.includes('already redeemed'))return 'Ezt a kupont már felhasználták.';
  if(m.includes('expired voucher'))return 'A kupon lejárt.';
  if(m.includes('admin only'))return 'Nincs admin jogosultság.';
  return message||'A kupon beváltása nem sikerült.';
};

export default async function handler(req,res){
  if(req.method!=='POST')return json(res,405,{error:'POST only'});

  const auth=req.headers.authorization||'';
  const token=auth.startsWith('Bearer ')?auth.slice(7):'';
  if(!token)return json(res,401,{error:'Nincs admin munkamenet.'});

  const ur=await fetch(U+'/auth/v1/user',{headers:{apikey:K,Authorization:'Bearer '+token}});
  if(!ur.ok)return json(res,401,{error:'Lejárt munkamenet.'});
  const user=await ur.json();
  if(user?.app_metadata?.is_admin!==true)return json(res,403,{error:'Nincs admin jogosultság.'});

  const code=String(req.body?.code||'').trim();
  const note=String(req.body?.note||'').trim();
  if(!code)return json(res,400,{error:'Add meg a kuponkódot.'});

  const rr=await fetch(U+'/rest/v1/rpc/redeem_coupon',{
    method:'POST',
    headers:{
      apikey:K,
      Authorization:'Bearer '+token,
      'Content-Type':'application/json'
    },
    body:JSON.stringify({p_code:code,p_note:note||null})
  });

  const rpcBody=await rr.json().catch(()=>null);
  if(!rr.ok){
    return json(res,400,{error:friendlyError(rpcBody?.message||rpcBody?.error||'')});
  }

  const redeemed=Array.isArray(rpcBody)?rpcBody[0]:rpcBody;
  if(!redeemed?.code)return json(res,500,{error:'A beváltás megtörtént, de a válasz feldolgozása nem sikerült.'});

  const email=redeemed.recipient_email;
  if(!email){
    return json(res,200,{
      ok:true,
      code:redeemed.code,
      coupon_type:redeemed.coupon_type,
      email_sent:false,
      warning:'A kupon beváltva, de nincs e-mail cím a visszaigazoláshoz.'
    });
  }

  const key=process.env.RESEND_API_KEY;
  if(!key){
    return json(res,200,{
      ok:true,
      code:redeemed.code,
      coupon_type:redeemed.coupon_type,
      email_sent:false,
      warning:'A kupon beváltva, de az e-mail küldés nincs beállítva.'
    });
  }

  const valueText=redeemed.coupon_type==='newsletter'
    ? esc((redeemed.discount_percent||5)+'% kedvezmény')
    : esc(redeemed.value_eur+' € kedvezmény');
  const name=esc(redeemed.recipient_name||'Kedves Utasunk');
  const usedAt=new Date(redeemed.redeemed_at||Date.now()).toLocaleString('hu-HU');
  const noteBlock=note
    ? `<div style="margin:18px 0;background:#f8fafc;border-radius:14px;padding:14px;color:#475569"><b>Felhasználás:</b> ${esc(note)}</div>`
    : '';

  const html=`<!doctype html><html><body style="margin:0;background:#eef9ff;font-family:Arial,sans-serif;color:#10233b"><table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 12px"><tr><td align="center"><table width="100%" style="max-width:620px;background:#fff;border-radius:28px;overflow:hidden;box-shadow:0 12px 40px #0c4a6e22"><tr><td style="padding:28px;text-align:center;background:linear-gradient(135deg,#059669,#0ea5e9);color:#fff"><div style="font-size:14px;font-weight:800;letter-spacing:2px">HURGHADA PROGRAMOK</div><div style="font-size:29px;font-weight:900;margin-top:8px">✅ KUPON FELHASZNÁLVA</div></td></tr><tr><td style="padding:30px"><p style="font-size:17px">Szia <b>${name}</b>!</p><p>Ezúton visszaigazoljuk, hogy a Hurghada Programok kuponodat sikeresen felhasználtuk.</p><div style="margin:24px 0;padding:22px;border:2px dashed #10b981;border-radius:20px;background:#ecfdf5;text-align:center"><div style="font-size:13px;font-weight:800;color:#047857">FELHASZNÁLT KUPON</div><div style="font-size:30px;font-weight:900;letter-spacing:2px;color:#065f46;margin:8px 0">${esc(redeemed.code)}</div><div style="font-size:18px;font-weight:800;color:#0284c7">${valueText}</div><div style="font-size:13px;color:#64748b;margin-top:8px">Felhasználva: ${esc(usedAt)}</div></div>${noteBlock}<div style="background:#fff7ed;border-radius:16px;padding:16px;color:#9a3412;font-size:14px"><b>Fontos:</b> ez a kupon egyszer használható, ezért a továbbiakban már nem váltható be újra.</div><p style="margin-top:24px">Köszönjük, hogy a Hurghada Programokat választottad! ☀️</p><p style="color:#64748b">Hurghada Programok</p></td></tr></table></td></tr></table></body></html>`;

  const er=await fetch('https://api.resend.com/emails',{
    method:'POST',
    headers:{
      Authorization:'Bearer '+key,
      'Content-Type':'application/json',
      'Idempotency-Key':'coupon-redeemed-'+redeemed.coupon_type+'-'+redeemed.code
    },
    body:JSON.stringify({
      from:'Hurghada Programok <uzenet@hurghadaprogramok.hu>',
      to:[email],
      subject:'✅ A Hurghada Programok kuponod felhasználva',
      html
    })
  });

  if(!er.ok){
    const err=await er.text();
    console.error('coupon redemption email failed',err);
    return json(res,200,{
      ok:true,
      code:redeemed.code,
      coupon_type:redeemed.coupon_type,
      email_sent:false,
      warning:'A kupon beváltva, de a visszaigazoló e-mail küldése nem sikerült.'
    });
  }

  return json(res,200,{
    ok:true,
    code:redeemed.code,
    coupon_type:redeemed.coupon_type,
    email_sent:true,
    email
  });
}
