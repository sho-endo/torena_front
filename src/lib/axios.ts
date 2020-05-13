import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
