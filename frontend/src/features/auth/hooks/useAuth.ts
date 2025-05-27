import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthenticated, setLoggedOut, setUser } from '../store/authSlice';
import { authService } from '../services/authService';
import { User } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        dispatch(setAuthenticated(true));
        // Si necesitas el usuario, puedes obtenerlo del token decodificado
        const token = localStorage.getItem('access');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            dispatch(setUser({
              id: payload.user_id,
              username: payload.username,
              email: payload.email || ''
            }));
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      } else {
        dispatch(setLoggedOut());
      }
      setLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  const login = async (username: string, password: string) => {
    try {
      const { access, user } = await authService.login({ username, password });
      localStorage.setItem('access', access);
      dispatch(setUser(user));
      dispatch(setAuthenticated(true));
      navigate('/tables', { replace: true });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch(setLoggedOut());
    navigate('/login', { replace: true });
  };

  return {
    isLoggedIn,
    loading,
    login,
    logout
  };
}; 