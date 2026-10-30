import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ViewportSection({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Default to visible if IntersectionObserver is not supported (SSR / fallback)
  const [isVisible, setIsVisible] = useState(() => {
    return typeof window === 'undefined' || !('IntersectionObserver' in window);
  });
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isVisible) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once it intersects or comes within 300px margin, mount it permanently
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height > 0) {
        setMinHeight(entry.contentRect.height);
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={className}
      style={!isVisible && minHeight ? { minHeight } : undefined}
    >
      {isVisible ? children : null}
    </div>
  );
}