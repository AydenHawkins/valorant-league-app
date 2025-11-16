import { api } from './api';

export const authService = {
  async signup(username, email, password) {
    const response = await api.post('/auth/signup', {
      username,
      email,
      password,
    });

    // Token is now stored in HTTP-only cookie by the server
    // Only store user data in localStorage
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  async login(username, password) {
    const response = await api.post('/auth/login', {
      username,
      password,
    });

    // Token is now stored in HTTP-only cookie by the server
    // Only store user data in localStorage
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  async logout() {
    // Call backend to clear the HTTP-only cookie
    try {
      await api.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local user data
      localStorage.removeItem('user');
    }
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    // Check if user data exists in localStorage
    // The actual token validation happens on the server
    return !!this.getUser();
  },
};
