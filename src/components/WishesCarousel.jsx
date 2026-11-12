import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/content';

export default function WishesCarousel() {
  const { wishesSection } = siteConfig;
  const wishes = wishesSection.wishes;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-carousel transition every 3.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wishes.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [wishes.length]);

  return (
    <section id="wishes-section" className="relative py-12 md:py-20 px-4 z-10 w-full max-w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center w-full">
        {/* Section Heading */}
        <div className="mb-8 px-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-[#9E2A4B] bg-[#FFE4EA] px-4 py-1.5 rounded-full mb-3 shadow-xs border border-[#FCD2DC]"
          >
            <span>✨ HEARTFELT WISHES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#671226] mb-3 leading-tight"
          >
            {wishesSection.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#6B4450] leading-relaxed"
          >
            {wishesSection.subheading}
          </motion.p>
        </div>

        {/* Carousel White Box */}
        <div className="aesthetic-card rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 md:p-12 shadow-[0_18px_45px_-12px_rgba(220,100,130,0.22)] relative overflow-hidden w-full">
          {/* Top Pill */}
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A4B] font-semibold bg-[#FFE4EA] px-4 py-1 rounded-full mb-6 inline-block border border-[#FCD2DC]">
            Wish 0{currentIndex + 1} of 03 💌
          </span>

          {/* Animated Carousel Slide */}
          <div className="min-h-[110px] sm:min-h-[130px] flex flex-col items-center justify-center px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-3xl mb-3">{wishes[currentIndex].emoji}</span>
                <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#671226] font-medium leading-relaxed max-w-xl">
                  "{wishes[currentIndex].text}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {wishes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 h-2 bg-[#9E2A4B]'
                    : 'w-2 h-2 bg-[#FCD2DC] hover:bg-[#F472B6]'
                }`}
                title={`Go to wish ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
