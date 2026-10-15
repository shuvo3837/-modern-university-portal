import React from 'react';

export const Card = ({
  children,
  className = '',
  title,
  subtitle,
  headerAction,
  footer,
  noPadding = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-[#E2E6EE] transition-all ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className="px-5 py-4 border-b border-[#E2E6EE] flex items-center justify-between gap-4">
          <div>
            {title && (
              <h3 className="font-semibold text-[#172033] text-sm sm:text-base tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#5B6475] mt-0.5 leading-normal">{subtitle}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
      {footer && (
        <div className="px-5 py-3 bg-[#F7F8FA] border-t border-[#E2E6EE] rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
