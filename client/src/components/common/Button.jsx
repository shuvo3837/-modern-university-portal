import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary:
      'bg-[#172033] text-white hover:bg-[#232F48] focus:ring-[#172033] border border-[#172033] shadow-2xs',
    accent:
      'bg-[#3157D5] text-white hover:bg-[#2546B5] focus:ring-[#3157D5] border border-[#3157D5] shadow-2xs',
    secondary:
      'bg-white text-[#172033] border border-[#E2E6EE] hover:bg-[#F7F8FA] hover:border-slate-300 focus:ring-[#3157D5]',
    outline:
      'border border-[#3157D5] text-[#3157D5] hover:bg-[#3157D5]/5 focus:ring-[#3157D5]',
    ghost:
      'text-[#5B6475] hover:bg-[#F7F8FA] hover:text-[#172033] focus:ring-slate-300',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 border border-rose-600 shadow-2xs',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2 font-semibold',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
