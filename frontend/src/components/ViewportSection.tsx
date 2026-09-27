import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function ViewportSection({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '150px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} style={!visible && height ? { height } : undefined}>
      {visible && children}
    </div>
  );
}