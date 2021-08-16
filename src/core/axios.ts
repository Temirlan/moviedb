import Axios from 'axios';
import { TMDB_API_URL, TMDB_AUTH_TOKEN } from '../constants';

export const axios = Axios.create({
  baseURL: TMDB_API_URL,
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TMDB_AUTH_TOKEN}`;

  return config;
});
