import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-4 text-slate-500 ${className}`}>
      <Loader2 className={`animate-spin text-indigo-600 ${sizeClasses[size] || sizeClasses.md}`} />
      {text && <p className="text-xs font-medium text-slate-600">{text}</p>}
    </div>
  );
};

export default Loader;
