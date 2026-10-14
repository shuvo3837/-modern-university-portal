import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const parseDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const AuditDate = ({ label, name, value, onChange, required = false }) => {
  const selected = parseDate(value);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => selected || new Date());
  const rootRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const lead = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];

  const labelText = selected
    ? selected.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Choose a date';

  return (
    <div className="audit-field" ref={rootRef}>
      {label && (
        <span className="type-14">
          {label}
          {required ? ' *' : ''}
        </span>
      )}
      <button
        type="button"
        className="audit-select"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{labelText}</span>
      </button>
      {open && (
        <div className="audit-cal" role="dialog" aria-label={label || 'Date'}>
          <div className="audit-cal-nav">
            <button
              type="button"
              className="icon-circle"
              aria-label="Previous month"
              onClick={() => setCursor(new Date(year, month - 1, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="type-16">
              {cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </span>
            <button
              type="button"
              className="icon-circle"
              aria-label="Next month"
              onClick={() => setCursor(new Date(year, month + 1, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="audit-cal-grid">
            {WEEKDAYS.map((day) => (
              <span key={day} className="type-14">
                {day}
              </span>
            ))}
            {cells.map((day, index) =>
              day ? (
                <button
                  key={day}
                  type="button"
                  className={
                    selected &&
                    selected.getDate() === day &&
                    selected.getMonth() === month &&
                    selected.getFullYear() === year
                      ? 'is-selected'
                      : ''
                  }
                  onClick={() => {
                    onChange({ target: { name, value: formatDate(new Date(year, month, day)) } });
                    setOpen(false);
                  }}
                >
                  {day}
                </button>
              ) : (
                <span key={`empty-${index}`} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditDate;
