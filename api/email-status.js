export default function handler(_req,res){
 res.status(200).json({configured:Boolean(process.env.RESEND_API_KEY),sender:'uzenet@hurghadaprogramok.hu'})
}