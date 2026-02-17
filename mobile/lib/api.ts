import axios from 'axios'
import Constants from 'expo-constants'
import { supabase } from './supabase'

const API_URL = Constants.expoConfig?.extra?.apiUrl || process.env.API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_URL,
})

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

export default api
