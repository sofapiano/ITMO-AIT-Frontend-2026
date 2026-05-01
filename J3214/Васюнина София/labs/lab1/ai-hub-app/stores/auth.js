import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    userName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
  },
  actions: {
    async login(credentials) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        const result = await response.json();

        if (response.ok) {
          this.setAuth(result);
          return { success: true };
        }
        return { success: false, message: 'Неверный логин или пароль' };
      } catch (error) {
        return { success: false, message: 'Ошибка сервера' };
      }
    },
    async register(userData) {
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        const result = await response.json();

        if (response.ok) {
          this.setAuth(result);
          return { success: true };
        }
        return { success: false, message: result };
      } catch (error) {
        return { success: false, message: 'Ошибка при регистрации' };
      }
    },
    setAuth(data) {
      this.user = data.user;
      this.accessToken = data.accessToken;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('accessToken', data.accessToken);
    },
    logout() {
      this.user = null;
      this.accessToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  },
});