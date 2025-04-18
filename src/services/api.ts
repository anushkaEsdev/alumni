import axios from 'axios';

// Create API instance
export const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'https://alumni-7bn6.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Posts API
export const postsAPI = {
  getAll: () => api.get('/posts'),
  getById: (id: string) => api.get(`/posts/${id}`),
  create: (data: any) => api.post('/posts', data),
  update: (id: string, data: any) => api.put(`/posts/${id}`, data),
  delete: (id: string) => api.delete(`/posts/${id}`),
  addComment: (id: string, content: string) =>
    api.post(`/posts/${id}/comments`, { content })
};

// Questions API
export const questionsAPI = {
  getAll: () => api.get('/questions'),
  getById: (id: string) => api.get(`/questions/${id}`),
  create: (data: any) => api.post('/questions', data),
  update: (id: string, data: any) => api.put(`/questions/${id}`, data),
  delete: (id: string) => api.delete(`/questions/${id}`),
  addComment: (id: string, content: string) =>
    api.post(`/questions/${id}/comments`, { content })
};

// Events API
export const eventsAPI = {
  getAll: () => api.get('/events'),
  getById: (id: string) => api.get(`/events/${id}`),
  create: (data: any) => api.post('/events', data),
  update: (id: string, data: any) => api.put(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
  addComment: (id: string, content: string) =>
    api.post(`/events/${id}/comments`, { content })
};

// Auth API
export const authAPI = {
  register: (username: string, email: string, password: string) => 
    api.post('/auth/register', { username, email, password }),
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  forgotPassword: (email: string) => 
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post(`/auth/reset-password/${token}`, { password }),
  updateProfile: (data: any) => 
    api.put('/auth/profile', data),
  updatePassword: (currentPassword: string, newPassword: string) => 
    api.put('/auth/password', { currentPassword, newPassword })
}; 