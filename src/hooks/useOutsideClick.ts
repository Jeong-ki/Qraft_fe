import { useEffect, useRef } from 'react';

type UseOutsideClickHandler = () => void;
type ExcludedClassNames = string[];

export const useOutsideClick = <T extends HTMLElement>(
  handler: UseOutsideClickHandler,
  excludedClassNames: ExcludedClassNames = [],
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      const clickedOnExcludedEl = excludedClassNames.some((className) =>
        target.classList.contains(className),
      );

      const clickedInsideExcludedEl = clickedOnExcludedEl && ref.current?.contains(target);

      if (ref.current && !ref.current.contains(target) && !clickedInsideExcludedEl) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, excludedClassNames]);

  return ref;
};
