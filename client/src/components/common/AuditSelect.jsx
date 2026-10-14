import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const AuditSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  variant = 'field',
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="audit-field" ref={rootRef}>
      {label && <span className="type-14">{label}</span>}
      <button
        type="button"
        className={`audit-select ${variant === 'settings' ? 'settings-select' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="truncate">{selected?.label || 'Choose'}</span>
        <ChevronDown className="w-4 h-4 shrink-0" />
      </button>
      {open && (
        <div className="audit-menu" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange({ target: { name, value: option.value } });
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditSelect;
