import type { VercelRequest, VercelResponse } from '@vercel/node'

type AddressProperties = { countrycode?: string; housenumber?: string; street?: string; name?: string; district?: string; city?: string; state?: string; postcode?: string }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const query = typeof req.query.q === 'string' ? req.query.q.trim() : ''
  if (query.length < 4 || query.length > 250) return res.status(400).json({ error: 'Enter between 4 and 250 characters' })
  try {
    const url = new URL('https://photon.komoot.io/api/')
    url.search = new URLSearchParams({ q: query, countrycode: 'AU', lat: '-33.8688', lon: '151.2093', limit: '6', lang: 'en' }).toString()
    const response = await fetch(url, { signal: AbortSignal.timeout(6000), headers: { 'User-Agent': 'JamienDrone-AddressSuggestions/1.0 (https://www.jamiendrone.com.au)' } })
    if (!response.ok) throw new Error('Address lookup unavailable')
    const data: { features?: { properties: AddressProperties }[] } = await response.json()
    const labels = (data.features || []).filter(feature => feature.properties.countrycode?.toUpperCase() === 'AU').map(({ properties: address }) => {
      const street = [address.housenumber, address.street].filter(Boolean).join(' ')
      return [...new Set([street || address.name, address.district || address.city, address.state, address.postcode].filter(Boolean))].join(', ')
    }).filter(Boolean)
    return res.status(200).json({ addresses: [...new Set(labels)].slice(0, 6) })
  } catch {
    return res.status(503).json({ error: 'Address suggestions unavailable. Please enter your address manually.' })
  }
}
