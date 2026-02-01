import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://recursos-humanos-khwg.onrender.com/', // Substitua pela URL real do seu backend
});