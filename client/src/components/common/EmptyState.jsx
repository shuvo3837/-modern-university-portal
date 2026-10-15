import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title = 'No records found',
  description = 'There are no items to display at this time.',
  actionLabel,
  onAction,
  actionIcon,
  className = '',
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  return (
    <div
      className={`rounded-lg border border-dashed border-[#E2E6EE] bg-white p-8 sm:p-12 text-center max-w-xl mx-auto my-6 ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-lg bg-[#F7F8FA] border border-[#E2E6EE] text-[#5B6475] flex items-center justify-center mx-auto mb-4">
          <Icon className="w-5 h-5 text-[#3157D5]" />
        </div>
      )}
      <h3 className="text-base font-semibold text-[#172033] tracking-tight">{title}</h3>
      <p className="text-xs sm:text-sm text-[#5B6475] mt-1.5 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          {actionLabel && (
            <Button
              variant="primary"
              size="sm"
              icon={actionIcon}
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
