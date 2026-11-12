import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { siteConfig } from '../config/content';

export default function ScratchCard() {
  const { scratchCard } = siteConfig;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  const isScratchingRef = useRef(false);
  const lastPointRef = useRef(null);
  const hasRevealedPermanentRef = useRef(false);

  // Trigger celebratory confetti once
  const fireCelebration = useCallback(() => {
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 55,
      origin: { x: 0.15, y: 0.6 },
      colors: ['#FF9EB5', '#F472B6', '#FBBF24', '#C084FC', '#FFF'],
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 55,
      origin: { x: 0.85, y: 0.6 },
      colors: ['#FF9EB5', '#F472B6', '#FBBF24', '#C084FC', '#FFF'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.5 },
        shapes: ['circle', 'star'],
        colors: ['#F43F5E', '#FDA4AF', '#FCD34D', '#E879F9'],
      });
    }, 200);
  }, []);

  // Initialize Canvas ONCE ONLY
  const initCanvas = useCallback(() => {
    if (hasRevealedPermanentRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const w = rect.width || 320;
    const h = rect.height || 400;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.scale(dpr, dpr);

    // Silver / Rose Gradient coating
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#E8D5DD');
    grad.addColorStop(0.3, '#FCE7F0');
    grad.addColorStop(0.6, '#E2D0D9');
    grad.addColorStop(1, '#DDC2CE');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative shimmering dots
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 35; i++) {
      const rx = (Math.sin(i * 77) * 0.5 + 0.5) * w;
      const ry = (Math.cos(i * 44) * 0.5 + 0.5) * h;
      const size = (i % 3) + 2;
      ctx.beginPath();
      ctx.arc(rx, ry, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Inner subtle border
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.restore();

    // Surface Typography
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.font = '26px sans-serif';
    ctx.fillText('✨ 🎁 ✨', w / 2, h / 2 - 28);

    const titleFontSize = w < 340 ? '16px' : '19px';
    ctx.font = `bold ${titleFontSize} "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = '#6E1D33';
    ctx.fillText(scratchCard.scratchSurfaceText, w / 2, h / 2 + 12);

    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#8C324A';
    ctx.fillText('Drag or swipe to scratch!', w / 2, h / 2 + 40);

    ctx.restore();
  }, [scratchCard.scratchSurfaceText]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Check how much coating has been scratched off
  const checkScratchPercentage = useCallback(() => {
    if (hasRevealedPermanentRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { width, height } = canvas;

    const sampleStep = 10;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let totalSampled = 0;
    let transparentCount = 0;

    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const index = (y * width + x) * 4;
        totalSampled++;
        if (data[index + 3] < 30) {
          transparentCount++;
        }
      }
    }

    const percentage = Math.round((transparentCount / totalSampled) * 100);
    setScratchProgress(percentage);

    // Auto-reveal when >= 40% cleared
    if (percentage >= 40 && !hasRevealedPermanentRef.current) {
      hasRevealedPermanentRef.current = true;
      setIsRevealed(true);
      ctx.clearRect(0, 0, width, height);
      fireCelebration();
    }
  }, [fireCelebration]);

  const scratch = (clientX, clientY) => {
    if (hasRevealedPermanentRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.globalCompositeOperation = 'destination-out';

    const brushRadius = 30 * dpr;

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.lineWidth = brushRadius * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };
  };

  const handleMouseDown = (e) => {
    if (hasRevealedPermanentRef.current) return;
    isScratchingRef.current = true;
    lastPointRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isScratchingRef.current || hasRevealedPermanentRef.current) return;
    scratch(e.clientX, e.clientY);
    checkScratchPercentage();
  };

  const handleMouseUp = () => {
    isScratchingRef.current = false;
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  const handleTouchStart = (e) => {
    if (hasRevealedPermanentRef.current) return;
    isScratchingRef.current = true;
    lastPointRef.current = null;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isScratchingRef.current || hasRevealedPermanentRef.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
    checkScratchPercentage();
  };

  const handleTouchEnd = () => {
    isScratchingRef.current = false;
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  return (
    <section id="scratch-section" className="relative py-10 md:py-16 px-4 z-10 flex flex-col items-center w-full max-w-full overflow-hidden">
      <div className="max-w-2xl w-full text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-[#9E2A4B] bg-[#FFE4EA] px-4 py-1.5 rounded-full mb-3 shadow-xs border border-[#FCD2DC]"
        >
          <span>{scratchCard.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#671226] mb-2 leading-tight"
        >
          {scratchCard.title}
        </motion.h2>

        <p className="text-xs sm:text-sm md:text-base text-[#754452] mb-6 max-w-md mx-auto leading-relaxed px-2">
          Swipe or drag across the card below to reveal what's hidden underneath.
        </p>

        {/* Scratch Card Frame */}
        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px]">
          <div
            ref={containerRef}
            className="aesthetic-card rounded-[28px] sm:rounded-[32px] p-3 sm:p-5 shadow-[0_20px_45px_-12px_rgba(220,110,135,0.22)] overflow-hidden"
          >
            {/* The Scratch Container */}
            <div className="relative w-full aspect-[4/5] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#FFF0F3] shadow-inner select-none">
              {/* Underlying Revealed Photo */}
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-1 sm:p-1.5 bg-[#FFF0F3]">
                <img
                  src={scratchCard.revealedImage}
                  alt={scratchCard.revealedImageAlt}
                  className="w-full h-full object-cover rounded-[18px] sm:rounded-[22px]"
                />
              </div>

              {/* Real HTML5 Canvas Overlay (One-time, disappears permanently when revealed) */}
              {!isRevealed && (
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="absolute inset-0 w-full h-full z-10 touch-none cursor-crosshair"
                />
              )}

              {/* Status badge */}
              <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
                <span className="inline-block bg-white/90 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium text-[#9E2A4B] shadow-xs">
                  {isRevealed ? '🎉 100% Revealed' : `${scratchProgress}% Cleared`}
                </span>
              </div>
            </div>

            {/* "The prettiest girl! ✨" appears as soon as scratching starts, and permanently when revealed */}
            <AnimatePresence>
              {(hasStarted || isRevealed) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 text-center px-1"
                >
                  <p className="font-serif font-bold text-xl sm:text-2xl text-[#671226] mb-1">
                    {scratchCard.postRevealMessage}
                  </p>
                  <p className="font-hand text-lg sm:text-xl text-[#9E2A4B]">
                    {scratchCard.postRevealSubtext}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
