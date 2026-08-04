"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

/**
 * Debounce a value — useful for search inputs.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 400);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Track whether a component is currently mounted.
 * Useful for preventing state updates on unmounted components.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted;
}

/**
 * Toggle a boolean state with a stable toggle function.
 *
 * @example
 * const [isOpen, toggleOpen, setIsOpen] = useToggle(false);
 */
export function useToggle(
  initialValue: boolean = false,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggle, setValue];
}

/**
 * Store a mutable value in a ref that doesn't trigger re-renders.
 * Keeps the latest callback reference without adding it to dependency arrays.
 */
export function useLatest<T>(value: T): RefObject<T | null> {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Track a previous value across renders using state derivation.
 * Avoids raw ref reads during render.
 *
 * @example
 * const prevCount = usePrevious(count);
 */
export function usePrevious<T>(value: T): T | undefined {
  const [prev, setPrev] = useState<T | undefined>(undefined);
  const [current, setCurrent] = useState<T>(value);

  if (value !== current) {
    setPrev(current);
    setCurrent(value);
  }

  return prev;
}

