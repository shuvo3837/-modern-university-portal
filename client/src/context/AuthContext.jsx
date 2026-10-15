/**
 * AuthContext
 * Central state management for user authentication, token persistence, and role data.
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN));
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            // ignore JSON parse error
          }
        }

        try {
          // Fetch fresh user profile from backend
          const res = await authService.getCurrentUser();
          const backendUser = res.data || res;
          setUser(backendUser);
          localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(backendUser));
        } catch (err) {
          console.warn('[AuthContext] Stored session expired or backend unreachable:', err.message);
          // If 401 or invalid token, clear session
          if (err.message?.includes('token') || err.message?.includes('401')) {
            authService.logout();
            setUser(null);
            setToken(null);
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      const receivedToken = res.token || res.data?.token;
      const receivedUser = res.user || res.data?.user;

      setToken(receivedToken);
      setUser(receivedUser);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      const receivedToken = res.token || res.data?.token;
      const receivedUser = res.user || res.data?.user;

      setToken(receivedToken);
      setUser(receivedUser);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = register;

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback((updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    loading,
    login,
    register,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
