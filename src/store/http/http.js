import axios from 'axios'

 export const http = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech/api',
  withCredentials: false,
  method: 'GET',
  headers: {
      'X-API-KEY':'c8d27731-aa32-4061-a78d-11a5caa77a9a' ,
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
