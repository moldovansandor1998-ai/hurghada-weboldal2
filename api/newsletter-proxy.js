const json = (res, status, body) =>
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(body))

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Csak POST kérés engedélyezett.' })

  const authorization = req.headers.authorization || ''
  if (!authorization.startsWith('Bearer ')) {
    return json(res, 401, { error: 'Jelentkezz be adminisztrátorként.' })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 50_000)

  try {
    const response = await fetch('https://vagyokrad.hu/api/hurghada-newsletter', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: authorization,
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
