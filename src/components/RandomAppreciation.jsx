import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { siteConfig } from '../config/content';

export default function RandomAppreciation() {
  const { randomGenerator } = siteConfig;
  const [currentMessage, setCurrentMessage] = useState(randomGenerator.messages[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(null);

  const generateRandom = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * randomGenerator.messages.length);
    } while (nextIndex === currentIndex && randomGenerator.messages.length > 1);

    setCurrentIndex(nextIndex);
    setCurrentMessage(randomGenerator.messages[nextIndex]);

    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF9EB5', '#F472B6', '#FBBF24', '#F43F5E'],
      ticks: 100,
    });
  };

  const handleEggClick = (egg) => {
    setSecretUnlocked(egg);
    confetti({
      particleCount: 30,
      spread: 75,
      colors: ['#FDE047', '#A78BFA', '#F472B6'],
    });
  };

  return (
    <section id="generator-section" className="relative py-12 md:py-20 px-4 z-10 w-full max-w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative w-full">
        {/* Floating Easter Egg Icons */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <motion.button
            whileHover={{ scale: 1.25, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleEggClick(randomGenerator.easterEggs[0])}
            title="A secret blossom! Click me ✨"
            className="text-2xl p-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          >
            🌸
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.25, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleEggClick(randomGenerator.easterEggs[1])}
            title="A secret star! Click me ✨"
            className="text-2xl p-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          >
            ⭐
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.25, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleEggClick(randomGenerator.easterEggs[2])}
            title="A musical easter egg! Click me ✨"
            className="text-2xl p-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          >
            🎶
          </motion.button>
        </div>

        {/* Section Heading */}
        <div className="mb-8 px-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-[#9E2A4B] bg-[#FFE4EA] px-4 py-1.5 rounded-full mb-3 shadow-xs"
          >
            <span>🎲 INSTANT GOOD VIBES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#671226] mb-3 leading-tight"
          >
            {randomGenerator.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#6B4450] leading-relaxed"
          >
            {randomGenerator.subheading}
          </motion.p>
        </div>

        {/* Interactive Random Card */}
        <div className="aesthetic-card rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 mb-6 shadow-[0_18px_40px_-15px_rgba(220,100,130,0.2)] relative overflow-hidden w-full">
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A4B] font-semibold bg-[#FFE4EA] px-3.5 py-1 rounded-full mb-5 inline-block">
            Today's Thought 💌
          </span>

          <div className="min-h-[90px] sm:min-h-[110px] flex items-center justify-center px-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#671226] font-medium leading-relaxed"
              >
                "{currentMessage}"
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-6 sm:mt-7">
            <motion.button
              onClick={generateRandom}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#9E2A4B] via-[#C0395D] to-[#9E2A4B] text-white font-medium text-sm sm:text-base shadow-[0_10px_20px_-5px_rgba(158,42,75,0.4)] transition-all cursor-pointer"
            >
              <span>{randomGenerator.buttonText}</span>
            </motion.button>
          </div>
        </div>

        <p className="text-xs text-[#9E3A53]/70 font-medium px-2">
          💡 Tap the 🌸 ⭐ 🎶 symbols above for secret notes!
        </p>

        {/* Secret Easter Egg Modal */}
        <AnimatePresence>
          {secretUnlocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSecretUnlocked(null)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.85, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-5 sm:p-7 max-w-xs sm:max-w-sm w-full text-center border border-[#FED7E2] shadow-2xl"
              >
                <div className="text-3xl mb-2">{secretUnlocked.hint}</div>
                <h4 className="font-serif font-bold text-lg text-[#671226] mb-2">
                  Secret Note Discovered!
                </h4>
                <p className="font-hand text-xl sm:text-2xl text-[#8E2845] mb-5 leading-snug">
                  {secretUnlocked.message}
                </p>
                <button
                  onClick={() => setSecretUnlocked(null)}
                  className="px-5 py-2 rounded-full bg-[#FFE4EA] hover:bg-[#FFD1DC] text-[#8E2845] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close & Keep Smiling ✨
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
