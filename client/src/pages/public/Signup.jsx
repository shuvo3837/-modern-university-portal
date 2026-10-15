import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, GraduationCap, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

export const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.username.trim()) {
      errs.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      errs.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid academic email';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
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
      await register({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please check details.');
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
            Create Account
          </h1>
          <p className="text-xs text-[#5B6475]">
            Join your university workspace and academic rooms.
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
              label="Username"
              id="username"
              placeholder="e.g. shuvos"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value.toLowerCase() });
                if (errors.username) setErrors({ ...errors, username: '' });
                if (apiError) setApiError('');
              }}
              icon={User}
              error={errors.username}
              required
            />

            <Input
              label="Institutional Email"
              id="email"
              type="email"
              placeholder="e.g. shuvo@metropolitan.edu"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
                if (apiError) setApiError('');
              }}
              icon={Mail}
              error={errors.email}
              required
            />

            <Select
              label="Campus Role"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: 'student', label: 'Student' },
                { value: 'teacher', label: 'Teacher / Faculty' },
                { value: 'department_head', label: 'Department Head' },
                { value: 'university_admin', label: 'University Administrator' },
              ]}
              required
            />

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="At least 6 characters"
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

            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                if (apiError) setApiError('');
              }}
              icon={Lock}
              showPasswordToggle
              error={errors.confirmPassword}
              required
            />

            <Button
              type="submit"
              variant="accent"
              size="md"
              className="w-full"
              disabled={loading}
              icon={ArrowRight}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#5B6475]">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-[#3157D5] hover:underline">
            Sign In instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
