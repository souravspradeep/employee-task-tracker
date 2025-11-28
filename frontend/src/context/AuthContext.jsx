import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/auth/me');
      setUser(response.data.user);
      setError(null);
    } catch (err) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name, department, position) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
        department,
        position,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/login', { email, password });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
