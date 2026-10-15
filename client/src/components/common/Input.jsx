import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  className = '',
  icon: Icon,
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-[#172033] mb-1.5 uppercase tracking-wider"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-md">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5B6475]">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-md border bg-white py-2 text-sm text-[#172033] placeholder:text-[#5B6475] transition-colors focus:outline-none focus:ring-1 focus:ring-[#3157D5] focus:border-[#3157D5] hover:border-slate-300 ${
            Icon ? 'pl-9' : 'px-3'
          } ${showPasswordToggle ? 'pr-9' : 'pr-3'} ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500 text-rose-900'
              : 'border-[#E2E6EE]'
          }`}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5B6475] hover:text-[#172033] focus:outline-none cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-[#5B6475]">{helperText}</p>}
    </div>
  );
};

export default Input;
