import axios from 'axios'
const isDevelopment = import.meta.env.MODE === 'development'
const baseUrl = isDevelopment
  ? import.meta.env.VITE_DEVELOPMENT_LOGIN_PATH || '/api/login'
  : '/api/login'

const login = async (credentials) => {
  const repsonse = await axios.post(baseUrl, credentials)
  return repsonse.data
}

export default { login }
