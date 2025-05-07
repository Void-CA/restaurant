// src/services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Aquí apunta a tu Django backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
