'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomDropdown({
  id,
  label,
  options,
  value,
  onChange,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const selectOption = (opt) => {
    onChange(opt.value);
    setOpen(false);
  };

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>{label}</label>
      <div className={`drop${open ? ' open' : ''}`} ref={ref} data-drop="custom">
        <button
          type="button"
          id={id}
          className="drop-button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{current?.label}</span>
        </button>
        <div className="drop-menu" role="listbox">
          {options.map((opt) => (
            <div
              key={opt.value}
              role="option"
              tabIndex={0}
              aria-selected={opt.value === value}
              className={`drop-item${opt.value === value ? ' selected' : ''}`}
              onClick={() => selectOption(opt)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectOption(opt);
                }
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
