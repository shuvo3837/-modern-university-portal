import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, GraduationCap, AlertCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.identifier.trim()) {
      errs.identifier = 'Email or Username is required';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      await login({
        email: formData.identifier,
        username: formData.identifier,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-lg bg-[#172033] text-white flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
            Academic Sign In
          </h1>
          <p className="text-xs text-[#5B6475]">
            Access your university rooms, courses, and schedules.
          </p>
        </div>

        {/* Card Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {apiError && (
              <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            <Input
              label="Email or Username"
              id="identifier"
              placeholder="e.g. dr.rahman or alexmorgan"
              value={formData.identifier}
              onChange={(e) => {
                setFormData({ ...formData, identifier: e.target.value });
                if (errors.identifier) setErrors({ ...errors, identifier: '' });
                if (apiError) setApiError('');
              }}
              icon={User}
              error={errors.identifier}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#172033] uppercase tracking-wider"
                >
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setApiError('Password reset link has been dispatched to your registered address.')}
                  className="text-xs text-[#3157D5] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: '' });
                  if (apiError) setApiError('');
                }}
                icon={Lock}
                showPasswordToggle
                error={errors.password}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={loading}
              icon={ArrowRight}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#5B6475]">
          New scholar or faculty member?{' '}
          <Link to="/signup" className="font-semibold text-[#3157D5] hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
