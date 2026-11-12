import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Falling & popping floating hearts background
 * Matches the reference image with cozy, gentle falling hearts.
 */
export default function FloatingParticles() {
  const hearts = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 88 + 6, // 6% to 94%
      size: Math.random() * 16 + 14, // 14px to 30px
      delay: Math.random() * 8,
      duration: Math.random() * 7 + 9, // 9s to 16s fall
      rotateStart: Math.random() * 40 - 20,
      rotateEnd: Math.random() * 60 - 30,
      opacity: Math.random() * 0.35 + 0.35, // 0.35 to 0.7
      color: i % 4 === 0 ? '#E11D48' : i % 4 === 1 ? '#F43F5E' : i % 4 === 2 ? '#FB7185' : '#FDA4AF',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 w-full max-w-full">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            top: '-40px',
          }}
          animate={{
            y: ['0vh', '108vh'],
            x: ['0px', `${(h.id % 2 === 0 ? 1 : -1) * 20}px`, '0px'],
            rotate: [h.rotateStart, h.rotateEnd, h.rotateStart],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            style={{ opacity: h.opacity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* A few gentle ambient sparkles */}
      {[15, 45, 78].map((left, idx) => (
        <motion.span
          key={`sparkle-${idx}`}
          className="absolute text-yellow-400 select-none text-base opacity-40"
          style={{ left: `${left}%`, top: `${20 + idx * 25}%` }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3.5 + idx, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
}
