import axios, { type AxiosInstance } from 'axios'

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})
