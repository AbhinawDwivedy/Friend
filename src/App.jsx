import React from 'react';
import FloatingParticles from './components/FloatingParticles';
import CustomCursor from './components/CustomCursor';
import Opening from './components/Opening';
import ScratchCard from './components/ScratchCard';
import SongSection from './components/SongSection';
import AppreciationCards from './components/AppreciationCards';
import WishesCarousel from './components/WishesCarousel';
import FinalSection from './components/FinalSection';

export default function App() {
  const scrollToScratch = () => {
    const el = document.getElementById('scratch-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-topo-pattern contour-overlay selection:bg-[#FCD2DC] selection:text-[#671226]">
      {/* Falling & Popping Ambient Hearts Background */}
      <FloatingParticles />

      {/* Smooth Trailing Desktop Cursor */}
      <CustomCursor />

      {/* Main Content Layout (Navbar removed as requested) */}
      <main className="relative z-10 w-full max-w-full overflow-x-hidden pt-2 space-y-12 md:space-y-20">
        {/* SECTION 1: Opening Screen (With "FOR MY FRIEND" & beautiful typography) */}
        <Opening onStartExplore={scrollToScratch} />

        {/* SECTION 2: Interactive Scratch Card (One-time only, never re-covers) */}
        <ScratchCard />

        {/* SECTION 3: Dedicated Song ("Tareef Karu Kya Uski") */}
        <SongSection />

        {/* SECTION 4: 4 Appreciation Cards */}
        <AppreciationCards />

        {/* SECTION 5: Auto-Carousel 3 Wishes */}
        <WishesCarousel />

        {/* SECTION 6: Final Appreciation Screen & Handwritten Letter */}
        <FinalSection onScrollToTop={scrollToTop} />
      </main>
    </div>
  );
}
