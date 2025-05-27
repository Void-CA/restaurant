import { LoginCredentials, LoginResponse, User } from '../types';
import { api } from '../../../core/api';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/token/', credentials);
    return {
      access: response.data.access,
      user: {
        id: 1, // Esto debería venir del backend
        username: credentials.username,
        email: `${credentials.username}@example.com` // Esto debería venir del backend
      }
    };
  },

  logout: () => {
    localStorage.removeItem('access');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access');
  }
}; 