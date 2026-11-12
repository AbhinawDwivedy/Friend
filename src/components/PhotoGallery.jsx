import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/content';

function PolaroidCard({ photo, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ scale: 1.03, rotate: '0deg', zIndex: 20 }}
      transition={{ duration: 0.35 }}
      style={{
        // On desktop use rotation, on very small mobile keep angle very subtle to avoid edge clipping
        '--photo-rot': photo.rotation,
      }}
      onClick={() => onSelect(photo)}
      className="relative cursor-pointer group bg-white rounded-2xl p-3 sm:p-4 shadow-[0_12px_28px_-10px_rgba(200,90,120,0.2)] border border-[#FFE1E8] transition-all hover:shadow-[0_20px_40px_-10px_rgba(200,80,110,0.3)] md:[transform:rotate(var(--photo-rot))] [transform:rotate(calc(var(--photo-rot)*0.4))] w-full max-w-sm mx-auto"
    >
      {/* Decorative Washi Tape */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 sm:h-6 rounded-xs transform -rotate-1 shadow-xs pointer-events-none z-10 opacity-80"
        style={{ backgroundColor: photo.tapeColor }}
      />

      {/* Photo Frame Container */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#FFF5F7] mb-2.5">
        <img
          src={photo.src}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-[#9E2A4B] shadow-sm">
            🔍 Expand
          </span>
        </div>
      </div>

      {/* Polaroid Caption */}
      <div className="px-1 py-1 text-center">
        <h4 className="font-serif font-bold text-sm sm:text-base text-[#671226] truncate">
          {photo.title}
        </h4>
        <p className="font-hand text-base sm:text-lg text-[#88364D] truncate">
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const { gallery } = siteConfig;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery-section" className="relative py-12 md:py-20 px-4 z-10 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 px-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-[#9E2A4B] bg-[#FFE4EA] px-4 py-1.5 rounded-full mb-3 shadow-xs"
          >
            <span>📸 MEMORY ARCHIVE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#671226] mb-3 leading-tight"
          >
            {gallery.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#6B4450] leading-relaxed"
          >
            {gallery.subheading}
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-9 pt-2 w-full">
          {gallery.photos.map((photo) => (
            <PolaroidCard
              key={photo.id}
              photo={photo}
              onSelect={setSelectedPhoto}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[92vw] max-w-lg bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl cursor-default border border-[#FFE4EC] max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFF0F4] hover:bg-[#FFE0E8] text-[#9E2A4B] font-bold flex items-center justify-center transition-colors cursor-pointer text-sm shadow-xs"
              >
                ✕
              </button>

              {/* Photo Display */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF5F7] mb-4 shadow-inner mt-2">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption */}
              <div className="text-center px-1">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#671226] mb-1">
                  {selectedPhoto.title}
                </h3>
                <p className="font-hand text-xl sm:text-2xl text-[#8E2845] leading-snug">
                  "{selectedPhoto.caption}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
