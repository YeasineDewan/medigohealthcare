import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Single active menu ('services' | 'health' | 'emergency' | null) + debounced hover close
 * to avoid flicker and conflicting timeouts between multiple dropdowns.
 */
export function useHeaderDropdowns() {
  const [active, setActive] = useState(null);
  const timerRef = useRef(null);

  const clearCloseTimer = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const openMenu = useCallback(
    (key) => {
      clearCloseTimer();
      setActive(key);
    },
    [clearCloseTimer]
  );

  /** Call when pointer leaves the whole trigger+panel wrapper */
  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    timerRef.current = window.setTimeout(() => {
      setActive(null);
      timerRef.current = null;
    }, 220);
  }, [clearCloseTimer]);

  const cancelClose = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const closeAll = useCallback(() => {
    clearCloseTimer();
    setActive(null);
  }, [clearCloseTimer]);

  const toggleMenu = useCallback(
    (key) => {
      clearCloseTimer();
      setActive((prev) => (prev === key ? null : key));
    },
    [clearCloseTimer]
  );

  return {
    active,
    openMenu,
    scheduleClose,
    cancelClose,
    closeAll,
    toggleMenu,
    isOpen: (key) => active === key,
  };
}
