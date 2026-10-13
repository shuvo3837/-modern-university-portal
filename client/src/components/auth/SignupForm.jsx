import React, { useState } from 'react';
import { Mail, Lock, User, Building, GraduationCap } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { USER_ROLES } from '../../utils/constants';
import { isValidEmail, isValidPassword } from '../../utils/validators';

export const SignupForm = ({ onSubmit, loading = false, error = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: USER_ROLES.STUDENT,
    university: 'Stanford University',
    department: 'Computer Science',
  });
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.username) {
      setValidationError('Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!isValidPassword(formData.password)) {
      setValidationError('Password must be at least 6 characters.');
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Full Name"
          id="name"
          name="name"
          placeholder="Alex Morgan"
          value={formData.name}
          onChange={handleChange}
          icon={User}
          required
        />

        <Input
          label="Username"
          id="username"
          name="username"
          placeholder="alexmorgan"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label="University Email"
        id="email"
        name="email"
        type="email"
        placeholder="alex.morgan@university.edu"
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
        placeholder="At least 6 characters"
        value={formData.password}
        onChange={handleChange}
        icon={Lock}
        required
      />

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
          Academic Role <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="block w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            {Object.values(USER_ROLES).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="University"
          id="university"
          name="university"
          placeholder="Stanford University"
          value={formData.university}
          onChange={handleChange}
          icon={GraduationCap}
        />
        <Input
          label="Department"
          id="department"
          name="department"
          placeholder="Computer Science"
          value={formData.department}
          onChange={handleChange}
          icon={Building}
        />
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Academic Account'}
      </Button>
    </form>
  );
};

export default SignupForm;
