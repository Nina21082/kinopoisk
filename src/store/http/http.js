import axios from 'axios'

 export const http = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech/api',
  withCredentials: false,
  method: 'GET',
  headers: {
      'X-API-KEY': '60199c90-ca1e-4ed8-8d0c-3c6f6b2a25c3',
      'Content-Type': 'application/json',
  },
})
http.interceptors.request.use((config) => {
  config.headers = {
    Accept: 'application/json',
    ...config.headers
  }
  if (localStorage.access_token){
    config.headers.Authorization = `Bearer ${localStorage.access_token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
http.interceptors.response.use((response) => response, (error) => {
  if (error?.response?.status === 401) {
    localStorage.clear();
    window.location.href = '/'
  }
  return Promise.reject(error);
});
