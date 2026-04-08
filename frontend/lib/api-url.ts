const PRODUCTION_API_URL = 'https://nexora-production-4883.up.railway.app/api'
const LOCAL_API_URL = 'http://localhost:5000/api'

export function getApiUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL

  if (configuredUrl) {
    return configuredUrl
  }

  return process.env.NODE_ENV === 'development' ? LOCAL_API_URL : PRODUCTION_API_URL
}
