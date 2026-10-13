/**
 * AuthContext
 * Central state management for user authentication, token persistence, and role data.
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';
import { mockCurrentUser } from '../data/mockData';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // In development mode, provide mockCurrentUser as fallback for smooth UI inspection
          // Can be toggled or logged out using the UI logout action
          setUser(mockCurrentUser);
        }
      } catch (err) {
        console.error('Failed to parse cached auth state:', err);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.data?.user || null);
      setToken(res.data?.token || null);
      return res;
    } catch (err) {
      // Allow dev test login
      if (credentials.email) {
        const devUser = { ...mockCurrentUser, email: credentials.email };
        setUser(devUser);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(devUser));
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'dev_mock_jwt_token');
        return { success: true, user: devUser };
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData) => {
    setLoading(true);
    try {
      const res = await authService.signup(userData);
      setUser(res.data?.user || null);
      setToken(res.data?.token || null);
      return res;
    } catch (err) {
      // Dev test fallback
      const devUser = {
        ...mockCurrentUser,
        name: userData.name || 'New Member',
        email: userData.email,
        role: userData.role || mockCurrentUser.role,
      };
      setUser(devUser);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(devUser));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'dev_mock_jwt_token');
      return { success: true, user: devUser };
    } finally {
      setLoading(false);
    }
  }, []);

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
    isAuthenticated: Boolean(user),
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
