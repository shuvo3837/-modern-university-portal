import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicRoute = ({ children, restricted = false }) => {
  const { isAuthenticated, loading } = useAuth();

  // If restricted (like login/signup) and user is already authenticated, go to dashboard
  if (!loading && isAuthenticated && restricted) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
