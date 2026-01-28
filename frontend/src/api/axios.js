import axios from 'axios';

const jwt = localStorage.getItem('jwtToken');

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});

export default api;
