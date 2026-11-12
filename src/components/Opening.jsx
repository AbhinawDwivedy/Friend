import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/content';

export default function Opening({ onStartExplore }) {
  const { recipientName, headerBadge, headerSubnote, opening } = siteConfig;

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 py-8 md:py-14 w-full max-w-full overflow-hidden">
      {/* 3D Decorative Floating Glass Spheres */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-4 md:left-20 w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#FFD1DC] to-[#FFF0F5] opacity-50 blur-xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [15, -15, 15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-16 right-4 md:right-20 w-28 h-28 sm:w-44 sm:h-44 rounded-full bg-gradient-to-bl from-[#FFE4E6] to-[#FCE7F3] opacity-50 blur-xl pointer-events-none"
      />

      {/* Top Header - Matches Reference Image 5 */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full text-center pt-2 sm:pt-4 z-10 px-2"
      >
        <div className="inline-block mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#9E2A4B] bg-[#FFE4EA] px-4 py-1.5 rounded-full shadow-xs border border-[#FCD2DC]">
            {headerBadge || 'FOR MY FRIEND'}
          </span>
        </div>

        {/* Swetha - High elegance serif font */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#601323] tracking-normal font-semibold leading-tight drop-shadow-xs">
          {recipientName}
        </h1>

        {/* Delicate Heart Divider */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent to-[#F497A9]" />
          <span className="text-[#C84E6E] text-sm">💖</span>
          <div className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent to-[#F497A9]" />
        </div>

        <p className="font-hand text-xl sm:text-2xl md:text-3xl text-[#8E3B50] italic max-w-md mx-auto px-2">
          {headerSubnote}
        </p>
      </motion.div>

      {/* Center Cinematic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="my-auto w-full max-w-lg sm:max-w-xl aesthetic-card rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 text-center z-10 my-6 shadow-[0_15px_35px_-10px_rgba(220,110,130,0.18)]"
      >
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#FFE4E9] to-[#FFF0F4] border border-[#FFCCD5] flex items-center justify-center text-3xl shadow-xs"
        >
          ✨
        </motion.div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#671226] mb-2 sm:mb-3 leading-snug">
          {opening.greeting}
        </h2>

        <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#7F263E] mb-3 px-1">
          "{opening.tagline}"
        </p>

        <p className="text-xs sm:text-sm md:text-base text-[#553840] leading-relaxed mb-5 font-normal px-1">
          {opening.description}
        </p>

        <div className="inline-block bg-[#FFF0F3] px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-[#FED7E2] mb-6 sm:mb-7">
          <p className="font-hand text-base sm:text-lg md:text-xl text-[#9E2A4B]">
            {opening.subtext}
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <motion.button
            onClick={onStartExplore}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#9E2A4B] via-[#BD3A5E] to-[#9E2A4B] text-white font-medium text-sm sm:text-base shadow-[0_10px_24px_-6px_rgba(158,42,75,0.45)] hover:shadow-[0_14px_28px_-6px_rgba(158,42,75,0.6)] transition-all cursor-pointer"
          >
            <span>{opening.ctaButtonText}</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Indicator */}
      <div className="text-[11px] tracking-wider uppercase text-[#9E2A4B]/60 font-semibold pb-1 z-10 flex flex-col items-center gap-0.5 select-none">
        <span>Scroll down to explore</span>
        <span>▿</span>
      </div>
    </section>
  );
}
