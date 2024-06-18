// // src/services/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8080', 
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['x-header-key'] = token;
//   }
//   return config;
// });

// export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const login = (credentials) => api.post('/admin/login', credentials);
export const register = (admin) => api.post('/admin', admin);
export const fetchProducts = () => api.get('/storage');
export const deleteProduct = (id) => api.delete(`/storage/${id}`);

export default api;
