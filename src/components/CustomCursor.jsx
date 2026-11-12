import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      const isInteractive = target.closest('button, a, input, canvas, [role="button"], .interactive-hover');
      setIsHoveringInteractive(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Trail follow effect
    const interval = setInterval(() => {
      setTrail((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25,
      }));
    }, 16);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [position]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer subtle halo */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${isHoveringInteractive ? 1.6 : 1})`,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-[#F472B6]/40 bg-[#FFE4E6]/20 backdrop-blur-[1px]" />
      </div>

      {/* Center dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shadow-[0_0_8px_#F43F5E]" />
      </div>
    </>
  );
}
