import { api } from './api';

export const authService = {
  async signup(username, email, password) {
    const response = await api.post('/auth/signup', {
      username,
      email,
      password,
    });

    // Store token and user data
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  async login(username, password) {
    const response = await api.post('/auth/login', {
      username,
      password,
    });

    // Store token and user data
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
