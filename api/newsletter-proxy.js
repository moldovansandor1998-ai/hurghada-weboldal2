const json = (res, status, body) =>
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(body))

const supabaseUrl = 'https://tvkjxvexlknwnrljwjwm.supabase.co'
const supabaseAnonKey = 'sb_publishable_LT-4OzlMTF3zHkBY0SDd8Q_DaVCO_YR'
const internalKey = 'hgp_7df1c86e24314813b91d59a20a64e82a'

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Csak POST kérés engedélyezett.' })

  const authorization = req.headers.authorization || ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
  if (!token) return json(res, 401, { error: 'Jelentkezz be adminisztrátorként.' })

  // The Hurghada backend verifies the browser session against the same Supabase
  // project used by its frontend. Only a verified admin may reach the mail service.
  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${token}` },
  })
  if (!userResponse.ok) return json(res, 401, { error: 'A belépés lejárt. Jelentkezz be újra.' })
  const user = await userResponse.json()

  const profileResponse = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=is_admin`,
    { headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${token}` } },
  )
  const profiles = profileResponse.ok ? await profileResponse.json() : []
  if (!profiles[0]?.is_admin) return json(res, 403, { error: 'Nincs admin jogosultság.' })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 50_000)

  try {
    const response = await fetch('https://vagyokrad.hu/api/hurghada-newsletter', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'X-Hurghada-Internal-Key': internalKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body || {}),
    })
    const body = await response.text()
    res.status(response.status)
      .setHeader('Content-Type', response.headers.get('content-type') || 'application/json; charset=utf-8')
      .send(body)
  } catch (error) {
    console.error('[Hurghada newsletter proxy] request failed', error)
    json(res, error?.name === 'AbortError' ? 504 : 502, {
      error: error?.name === 'AbortError'
        ? 'A levélküldő rendszer nem válaszolt időben.'
        : 'A levélküldő rendszer átmenetileg nem érhető el.',
    })
  } finally {
    clearTimeout(timeout)
  }
}
