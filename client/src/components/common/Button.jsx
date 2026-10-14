import React from 'react';

const variants = {
  primary: 'go-pill',
  secondary: 'nav-pill',
  add: 'body-add',
  outline: 'nav-pill',
  ghost: 'back-pill',
  danger: 'open-pill',
};

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
