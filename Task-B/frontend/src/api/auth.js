import axios from 'axios';

// Use import.meta.env for Vite
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL + '/auth'
    : 'http://localhost:5000/api/auth', // fallback for local dev
});

export const register = (email, password) => 
  API.post('/register', { email, password });

export const login = (email, password) => 
  API.post('/login', { email, password });

export default API;
