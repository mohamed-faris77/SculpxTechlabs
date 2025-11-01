// src/api/files.js
import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL + '/files'
      : 'http://localhost:5000/api/files',
});

// Attach JWT token for each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// API calls
export const listFiles = () => API.get('/');

export const uploadFile = (file, onProgress) => {
  const data = new FormData();
  data.append('file', file);
  return API.post('/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      const pct = Math.round((e.loaded * 100) / e.total);
      onProgress(pct);
    },
  });
};

export const renameFile = (id, newName) =>
  API.put(`/${id}/rename`, { newName });

export const deleteFile = (id) => API.delete(`/${id}`);
