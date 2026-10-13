import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { isValidEmail } from '../../utils/validators';

export const LoginForm = ({ onSubmit, loading = false, error = null }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setValidationError('Please enter both email and password.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setValidationError('Please enter a valid academic or university email.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(error || validationError) && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {error || validationError}
        </div>
      )}

      <Input
        label="University Email"
        id="email"
        name="email"
        type="email"
        placeholder="alex.morgan@stanford.edu"
        value={formData.email}
        onChange={handleChange}
        icon={Mail}
        required
      />

      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        icon={Lock}
        required
      />

      <div className="flex items-center justify-between text-xs text-slate-500">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
          <span>Remember this device</span>
        </label>
        <span className="text-indigo-600 hover:underline cursor-pointer">Forgot password?</span>
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? 'Authenticating...' : 'Sign In to Workspace'}
      </Button>
    </form>
  );
};

export default LoginForm;
