import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="page-title">Welcome Back</h1>
          <p className="text-sm text-slate-600 mt-1">Sign in to your university workspace</p>
        </div>

        <Card>
          <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        </Card>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an academic account?{' '}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
