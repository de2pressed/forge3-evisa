'use client';
import { useRef, useCallback, useEffect } from 'react';

export default function Toast() {
  const toastRef = useRef(null);
  const timerRef = useRef(null);

  const notify = useCallback((message) => {
    const toast = toastRef.current;
    if (!toast) return;
    const copy = toast.querySelector('[data-toast-copy]');
    if (copy) copy.textContent = message;
    toast.classList.add('show');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => toast.classList.remove('show'), 2800);
  }, []);

  // Expose notify globally so pages can use it
  useEffect(() => {
    window.__forgeToast = notify;
    return () => { delete window.__forgeToast; };
  }, [notify]);

  return (
    <div className="toast" id="toast" ref={toastRef} role="status">
      <span className="tick">✓</span>
      <span data-toast-copy>Saved</span>
    </div>
  );
}
