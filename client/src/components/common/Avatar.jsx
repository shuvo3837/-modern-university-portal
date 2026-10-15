import React from 'react';

export const Avatar = ({
  name = 'User',
  src,
  size = 'md',
  status, // 'available' | 'busy' | 'in_class' | 'offline'
  className = '',
}) => {
  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base font-semibold',
    xl: 'w-16 h-16 text-xl font-bold',
  };

  const statusColors = {
    available: 'bg-emerald-500',
    busy: 'bg-rose-500',
    in_class: 'bg-[#3157D5]',
    offline: 'bg-slate-400',
  };

  const statusSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
  };

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full object-cover border border-slate-200`}
        />
      ) : (
        <div
          className={`${
            sizeClasses[size] || sizeClasses.md
          } rounded-full bg-[#172033] text-white flex items-center justify-center font-medium tracking-tight select-none border border-slate-200/80 shadow-2xs`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 border-white ring-1 ring-slate-100 ${
            statusSize[size] || statusSize.md
          } ${statusColors[status] || statusColors.offline}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;
