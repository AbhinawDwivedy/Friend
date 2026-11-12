import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { siteConfig } from '../config/content';

export default function FinalSection({ onScrollToTop }) {
  const { recipientName, sealInitial, finalSection } = siteConfig;
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const openLetter = () => {
    setIsLetterOpen(true);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9EB5', '#FDA4AF', '#FCD34D'],
    });
  };

  return (
    <section id="final-section" className="relative py-12 md:py-24 px-4 z-10 w-full max-w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center w-full">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-[#9E2A4B] bg-[#FFE4EA] px-4 py-1.5 rounded-full mb-3 shadow-xs border border-[#FCD2DC]"
        >
          <span>🌷 FINAL THOUGHTS</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#671226] mb-4 leading-tight px-2"
        >
          {finalSection.heading}
        </motion.h2>

        {/* Closing messages */}
        <div className="space-y-3 max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[#52333B] font-normal leading-relaxed mb-10 px-2">
          <p>{finalSection.message1}</p>
          <p className="font-serif italic font-medium text-lg sm:text-xl text-[#7F263E]">
            "{finalSection.message2}"
          </p>
          <p className="text-[#8E2845] font-semibold">{finalSection.message3}</p>
        </div>

        {/* Postal Envelope */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-10 w-full"
        >
          <div
            onClick={openLetter}
            className="group relative w-full max-w-[300px] sm:max-w-[360px] mx-auto cursor-pointer"
          >
            {/* The Postal Envelope Container */}
            <div className="relative w-full aspect-[16/10] bg-[#FCE7F0] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_16px_36px_-10px_rgba(200,90,120,0.22)] border-2 border-[#FED7E2] transition-transform duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              {/* Flaps */}
              <div
                className="absolute inset-x-0 top-0 h-1/2 bg-[#881337] opacity-90 transition-all origin-top"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />
              <div
                className="absolute inset-x-0 top-0 h-1/2 bg-[#9F1239] opacity-70"
                style={{ clipPath: 'polygon(0 0, 50% 100%, 0 100%)' }}
              />

              {/* Little Stamp in Corner */}
              <div className="absolute top-2.5 right-3 w-8 h-10 bg-white rounded-xs border-2 border-dashed border-[#F472B6] flex items-center justify-center shadow-xs">
                <span className="text-xs">💖</span>
              </div>

              {/* Center Embossed Wax Seal (A for Abhinaw) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#601323] via-[#881337] to-[#9F1239] border-2 border-[#FFF0F3] shadow-md flex items-center justify-center text-white font-serif font-bold text-xl sm:text-2xl"
                >
                  {sealInitial || 'A'}
                </motion.div>
              </div>

              {/* Bottom fold */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-white/40"
                style={{ clipPath: 'polygon(0 100%, 50% 20%, 100% 100%)' }}
              />
            </div>

            {/* Pill button below envelope */}
            <div className="mt-3.5">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFE4EA] group-hover:bg-[#FFD1DC] text-[#8E2845] font-semibold text-xs sm:text-sm transition-colors shadow-xs">
                <span>{finalSection.letter.envelopeBadge}</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Footer & Scroll to Top */}
        <div className="border-t border-[#FCD2DC] pt-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#754452] px-2">
          <p className="font-serif italic">
            {finalSection.footer}
          </p>

          <button
            onClick={onScrollToTop}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-[#FFE4EA] text-[#8E2845] font-semibold text-xs border border-[#FED7E2] transition-colors cursor-pointer shadow-xs"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* HANDWRITTEN LETTER MODAL                                            */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isLetterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLetterOpen(false)}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[92vw] max-w-lg notebook-paper rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-white cursor-default text-left max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLetterOpen(false)}
                className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFE4EA] hover:bg-[#FFD1DC] text-[#8E2845] font-bold flex items-center justify-center transition-colors cursor-pointer text-xs sm:text-sm shadow-xs"
              >
                ✕
              </button>

              {/* Salutation */}
              <h3 className="font-hand text-2xl sm:text-3xl text-[#671226] font-bold mb-3 pl-3 sm:pl-4">
                {recipientName},
              </h3>

              {/* Letter Paragraphs */}
              <div className="font-hand text-lg sm:text-xl text-[#361921] space-y-3 pl-3 sm:pl-4 leading-relaxed">
                {finalSection.letter.letterBody.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Handwritten Signature */}
              <div className="mt-6 text-right pr-3 sm:pr-4 font-hand text-xl sm:text-2xl text-[#671226]">
                <p>{finalSection.letter.signature}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
