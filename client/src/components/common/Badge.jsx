import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral', // 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'primary'
  size = 'sm',
  className = '',
}) => {
  const variants = {
    neutral: 'bg-[#F7F8FA] text-[#5B6475] border-[#E2E6EE]',
    primary: 'bg-[#172033]/5 text-[#172033] border-[#172033]/15 font-semibold',
    accent: 'bg-[#3157D5]/10 text-[#3157D5] border-[#3157D5]/20 font-semibold',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5 tracking-tight',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded border font-medium uppercase tracking-wider ${
        variants[variant] || variants.neutral
      } ${sizes[size] || sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
