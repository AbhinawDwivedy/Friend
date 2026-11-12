import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/content';

function SingleCard({ card, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full min-h-[340px] sm:min-h-[360px] md:min-h-[380px] perspective-1000 cursor-pointer select-none group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`w-full h-full relative preserve-3d transition-transform duration-700 ease-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT SIDE */}
        <div
          className={`w-full h-full min-h-[340px] sm:min-h-[360px] md:min-h-[380px] rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 md:p-7 flex flex-col justify-between backface-hidden aesthetic-card bg-gradient-to-br ${card.gradient} shadow-[0_15px_30px_-12px_rgba(200,100,130,0.18)] border border-white/80 overflow-hidden`}
        >
          {/* Top Row: Emoji & Tag */}
          <div className="flex items-center justify-between gap-2">
            <span className="w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-xl shadow-xs shrink-0">
              {card.emoji}
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#7E223D] bg-white/70 px-3 py-1 rounded-full border border-white/40 truncate">
              {card.tag}
            </span>
          </div>

          {/* Middle: Title & Summary */}
          <div className="my-auto py-3">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#541223] mb-2 leading-snug">
              {card.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-[#4A2D35] font-medium leading-relaxed">
              {card.frontSummary}
            </p>
          </div>

          {/* Bottom Flip Hint Pill */}
          <div className="flex items-center justify-between pt-3 border-t border-black/5 text-xs text-[#8E2845] font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <span>Tap to reveal note</span>
              <span className="text-sm">↺</span>
            </span>
            <span className="text-black/30 font-mono text-[10px]">0{index + 1}</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full min-h-[340px] sm:min-h-[360px] md:min-h-[380px] rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 md:p-7 flex flex-col justify-between backface-hidden rotate-y-180 aesthetic-card bg-white shadow-[0_18px_36px_-10px_rgba(200,80,110,0.22)] border-2 overflow-hidden"
          style={{ borderColor: card.borderAccent }}
        >
          {/* Top Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E2845] bg-[#FFE4EA] px-3 py-1 rounded-full truncate">
              Personal Note 💌
            </span>
            <span className="text-base shrink-0">{card.emoji}</span>
          </div>

          {/* Note content with overflow containment */}
          <div className="my-auto py-2 overflow-y-auto max-h-[220px]">
            <h4 className="text-base sm:text-lg font-serif font-bold text-[#671226] mb-1.5">
              {card.title}
            </h4>
            <p className="font-hand text-lg sm:text-xl md:text-2xl text-[#3F252C] leading-snug">
              "{card.backMessage}"
            </p>
          </div>

          {/* Flip back footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-[#9E2A4B] font-semibold">
            <span>Tap to flip back</span>
            <span className="text-sm">↺</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppreciationCards() {
  const { appreciationCards } = siteConfig;

  return (
    <section id="cards-section" className="relative py-12 md:py-20 px-4 z-10 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 px-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-[#9E2A4B] bg-[#FFE4EA] px-4 py-1.5 rounded-full mb-3 shadow-xs"
          >
            <span>✨ THINGS WORTH CELEBRATING</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#671226] mb-3 leading-tight"
          >
            {appreciationCards.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#6B4450] leading-relaxed"
          >
            {appreciationCards.subheading}
          </motion.p>
        </div>

        {/* 4 Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 w-full">
          {appreciationCards.cards.map((card, idx) => (
            <SingleCard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
