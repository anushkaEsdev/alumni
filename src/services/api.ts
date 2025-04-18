import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),
};

// Posts API
export const postsAPI = {
  getAll: () => api.get('/posts'),
  getByType: (type: string) => api.get(`/posts/type/${type}`),
  create: (data: any) => api.post('/posts', data),
  update: (id: string, data: any) => api.put(`/posts/${id}`, data),
  delete: (id: string) => api.delete(`/posts/${id}`),
  addComment: (id: string, content: string) =>
    api.post(`/posts/${id}/comments`, { content }),
};

// Events API
export const eventsAPI = {
  getAll: () => api.get('/events'),
  getUpcoming: () => api.get('/events/upcoming'),
  getPast: () => api.get('/events/past'),
  create: (data: any) => api.post('/events', data),
  update: (id: string, data: any) => api.put(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
};

// Questions API
export const questionsAPI = {
  getAll: () => api.get('/questions'),
  getById: (id: string) => api.get(`/questions/${id}`),
  create: (data: any) => api.post('/questions', data),
  update: (id: string, data: any) => api.put(`/questions/${id}`, data),
  delete: (id: string) => api.delete(`/questions/${id}`),
  addAnswer: (id: string, content: string) =>
    api.post(`/questions/${id}/answers`, { content }),
};

export default api; 