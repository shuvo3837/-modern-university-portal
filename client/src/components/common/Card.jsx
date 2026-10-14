import React from 'react';

const variants = {
  sheet: 'warm-sheet',
  stat: 'stat-card',
  action: 'action-card',
  metric: 'metric-card',
  meeting: 'meeting-card',
  people: 'people-card',
  panel: 'warm-panel',
  board: 'meeting-board',
};

export const Card = ({
  children,
  className = '',
  title,
  subtitle,
  headerAction,
  variant = 'sheet',
  ...props
}) => {
  const variantClass = variants[variant] || variants.sheet;

  return (
    <div className={`${variantClass} ${className}`} {...props}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between gap-3">
          <div>
            {title && <h3 className="section-title">{title}</h3>}
            {subtitle && <p className="type-14">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
