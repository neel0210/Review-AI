import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const AI_LOADER_CYCLE_SECONDS = 1.6;

export interface AILoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dots' | 'bar' | 'grid';
  showElapsed?: boolean;
  label?: string;
  text?: string;
}

export default function AILoader({
  variant = 'grid',
  showElapsed = false,
  label,
  text,
  className = '',
  ...props
}: AILoaderProps) {
  const displayText = label || text || 'Thinking...';
  const [seconds, setSeconds] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!showElapsed) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showElapsed]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={displayText}
      className={`inline-flex items-center gap-3 text-xs font-medium ${className}`}
      style={{ color: 'var(--color-accent-text)' }}
      {...props}
    >
      {/* 3x3 Grid */}
      {variant === 'grid' && (
        <div className="grid grid-cols-3 gap-1 w-5 h-5 shrink-0">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-[2px]"
              style={{ background: 'var(--color-accent)' }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.8 }
                  : {
                      opacity: [0.15, 1, 0.15],
                      scale: [0.8, 1.05, 0.8],
                    }
              }
              transition={
                shouldReduceMotion
                  ? {}
                  : {
                      duration: AI_LOADER_CYCLE_SECONDS,
                      repeat: Infinity,
                      delay: (i % 3 + Math.floor(i / 3)) * 0.12,
                      ease: 'easeInOut',
                    }
              }
            />
          ))}
        </div>
      )}

      {/* Dots */}
      {variant === 'dots' && (
        <div className="flex items-center gap-1 shrink-0">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-accent)' }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.8 }
                  : { opacity: [0.2, 1, 0.2], scale: [0.75, 1, 0.75] }
              }
              transition={
                shouldReduceMotion
                  ? {}
                  : {
                      duration: AI_LOADER_CYCLE_SECONDS,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }
              }
            />
          ))}
        </div>
      )}

      {/* Bar */}
      {variant === 'bar' && (
        <div
          className="w-12 h-1.5 rounded-full overflow-hidden shrink-0"
          style={{ background: 'var(--color-surface-elevated)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--color-accent)' }}
            animate={
              shouldReduceMotion
                ? { width: '50%' }
                : { x: ['-100%', '100%'] }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    duration: AI_LOADER_CYCLE_SECONDS,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <span>{displayText}</span>
        {showElapsed && (
          <span className="font-mono text-[11px] opacity-75">
            ({formatTime(seconds)})
          </span>
        )}
      </div>
    </div>
  );
}
