import React from 'react';

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
  ...props
}) => {
  return (
    <div className={`audit-field ${className}`}>
      {label && (
        <label htmlFor={id} className="type-14">
          {label}
          {required ? ' *' : ''}
        </label>
      )}
      <div className={Icon ? 'search-wrap' : undefined}>
        {Icon && <Icon />}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="audit-select"
          {...props}
        />
      </div>
      {error && <p className="type-14">{error}</p>}
      {!error && helperText && <p className="type-14">{helperText}</p>}
    </div>
  );
};

export default Input;
