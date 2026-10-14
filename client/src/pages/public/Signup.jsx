import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupForm } from '../../components/auth/SignupForm';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await signup(userData);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="page-title">Create Academic Account</h1>
          <p className="text-sm text-slate-600 mt-1">
            Join your university, department, courses, and faculty network
          </p>
        </div>

        <Card>
          <SignupForm onSubmit={handleSignup} loading={loading} error={error} />
        </Card>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign In instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
