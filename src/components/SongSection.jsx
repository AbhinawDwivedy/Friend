import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/content';

export default function SongSection() {
  const { songSection } = siteConfig;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="song-section" className="relative py-12 md:py-20 px-4 z-10 w-full max-w-full overflow-hidden">
      <div className="max-w-3xl mx-auto w-full">
        {/* Floating Musical Notes */}
        <div className="relative pointer-events-none select-none">
          {[
            { note: '♪', top: '-15px', left: '10%' },
            { note: '♫', top: '5px', right: '12%' },
            { note: '♩', top: '-10px', right: '35%' },
          ].map((item, idx) => (
            <motion.span
              key={idx}
              animate={{
                y: [-8, 12, -8],
                opacity: [0.3, 0.75, 0.3],
              }}
              transition={{
                duration: 4 + idx,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ top: item.top, left: item.left, right: item.right }}
              className="absolute text-xl sm:text-2xl text-[#E87994] font-serif"
            >
              {item.note}
            </motion.span>
          ))}
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 px-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-[#9E2A4B] bg-[#FFE4EA] px-4 py-1.5 rounded-full mb-3 shadow-xs border border-[#FCD2DC]"
          >
            <span>🎙️ SPECIAL DEDICATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#671226] mb-3 leading-tight"
          >
            {songSection.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#6B4450] leading-relaxed"
          >
            {songSection.subtitle}
          </motion.p>
        </div>

        {/* Music Player Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="aesthetic-card rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_-15px_rgba(220,100,130,0.22)] relative overflow-hidden"
        >
          {/* Heartfelt Quote */}
          <div className="mb-6 md:mb-8 text-center max-w-xl mx-auto px-2">
            <span className="text-3xl sm:text-4xl text-[#F472B6] opacity-40 font-serif leading-none block mb-1">
              “
            </span>
            <p className="font-hand text-xl sm:text-2xl md:text-3xl text-[#5E1424] leading-relaxed">
              {songSection.quote}
            </p>
          </div>

          {/* Music Player Interface */}
          <div className="bg-gradient-to-r from-[#FFF5F7] to-[#FFF0F4] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#FED7E2] shadow-inner max-w-md mx-auto w-full">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              {/* Spinning Vinyl Disc */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isPlaying
                    ? { repeat: Infinity, duration: 4, ease: 'linear' }
                    : { duration: 0.5 }
                }
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#671226] to-[#A82B49] flex items-center justify-center text-white text-xl sm:text-2xl shadow-md shrink-0 relative"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FFF5F7] border-2 border-[#671226]" />
              </motion.div>

              {/* Track Info */}
              <div className="overflow-hidden min-w-0">
                <h4 className="font-serif font-bold text-base sm:text-lg text-[#671226] truncate">
                  {songSection.trackTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#88364D] truncate">
                  {songSection.artistName}
                </p>
                <span className="inline-block text-[10px] sm:text-[11px] font-semibold text-[#B91C1C]">
                  {isPlaying ? '● Playing' : '○ Ready'}
                </span>
              </div>
            </div>

            {/* Sound Wave Bars Animation */}
            <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-10 sm:h-12 mb-4 px-2 sm:px-4 bg-white/75 rounded-xl py-2 overflow-hidden">
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-[#E11D48] to-[#FDA4AF] shrink-0"
                  animate={{
                    height: isPlaying
                      ? [`${15 + (i % 4) * 10}%`, `${45 + ((i * 7) % 50)}%`, `${20 + (i % 3) * 15}%`]
                      : '20%',
                  }}
                  transition={{
                    duration: 0.4 + (i % 4) * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Play/Pause Control Button */}
            <div className="flex items-center justify-between text-xs font-mono text-[#88364D]">
              <span>{formatTime(currentTime)}</span>

              <button
                onClick={togglePlay}
                className="px-5 sm:px-6 py-2 rounded-full bg-[#671226] hover:bg-[#831835] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{isPlaying ? '⏸ Pause' : '▶ Play Song'}</span>
              </button>

              <span>{duration ? formatTime(duration) : songSection.duration}</span>
            </div>

            {/* Audio Element */}
            <audio
              ref={audioRef}
              src={songSection.audioSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
