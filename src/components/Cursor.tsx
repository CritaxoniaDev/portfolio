'use client';

import { useEffect, useRef } from 'react';
import { useCursor } from './hooks/useCursor';

export const Cursor = () => {
  const { isHovering } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Skip on touch devices — no mouse to follow
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMove);

    let rafId = 0;
    const ease = 0.18; // 0.1 = silky trail · 0.25 = snappy · 0.18 = sweet spot

    const tick = () => {
      // Move current toward target by a fraction each frame
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-multiply transition-[width,height,background-color] duration-300 ease-out pointer-coarse:hidden ${
        isHovering ? 'h-10 w-10 bg-black/15' : 'h-3 w-3 bg-black'
      }`}
      style={{ willChange: 'transform' }}
    />
  );
};