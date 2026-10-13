import React from 'react';

export const Card = ({ children, className = '', title, subtitle, headerAction, ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            {title && <h3 className="font-semibold text-slate-900 text-base">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};

export default Card;
