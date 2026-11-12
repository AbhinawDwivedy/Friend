# 🌸 A Little Something For You — Appreciation Website

A single-page website created to appreciate an amazing friend who sang a song for you. Designed with a soft blush pink topographic aesthetic inspired by the reference designs.

---

## 🌟 Live Preview

The development server is running and accessible at:
- **Local:** [http://localhost:3000](http://localhost:3000)
- **Mobile (on your same Wi-Fi):** `http://<your-computer-ip>:3000`

---

## 🎨 How to Personalize (In 2 Minutes)

All texts, headings, photo paths, and audio tracks can be modified in **a single file**:
📁 [`src/config/content.js`](file:///c:/Users/dwive/Downloads/Personal/src/config/content.js)

### 1. Change Her Name & Seal Initial
Open [`src/config/content.js`](file:///c:/Users/dwive/Downloads/Personal/src/config/content.js):
```javascript
export const siteConfig = {
  recipientName: "Maya",     // Change to her real name / nickname
  sealInitial: "M",           // Initial stamped on the wax seal envelope
  headerSubnote: "Just because. You sang for me, so I made you this.",
  // ...
};
```

### 2. Add Her Actual Photos
1. Copy her photos into [`public/images/`](file:///c:/Users/dwive/Downloads/Personal/public/images/)
2. Update the filenames in [`src/config/content.js`](file:///c:/Users/dwive/Downloads/Personal/src/config/content.js):
   - **Scratch Card photo:** update `revealedImage: "/images/her-photo.jpg"`
   - **Gallery Polaroids:** update `gallery.photos[...].src` and their captions

### 3. Add Her Singing Audio File (Optional)
1. Drop her voice note or song recording into [`public/audio/`](file:///c:/Users/dwive/Downloads/Personal/public/audio/) (e.g. `public/audio/song.mp3`)
2. In [`src/config/content.js`](file:///c:/Users/dwive/Downloads/Personal/src/config/content.js), set:
   ```javascript
   audioSrc: "/audio/song.mp3",
   trackTitle: "Her Acoustic Recording",
   ```
   *(If no audio file is provided yet, clicking "Play Song" plays a gentle, peaceful musical chime automatically).*

---

## 📦 Features Implemented

1. **Section 1: Cinematic Opening** — Blush topographic background, floating 3D spheres, animated typography, and smooth entry CTA.
2. **Section 2: Real Canvas Scratch Card** — Silver/lavender gradient coating, mouse drag & touch scratch, automatic ~50% reveal threshold with a celebratory confetti explosion and post-scratch note.
3. **Section 3: 3D Appreciation Cards** — 4 distinct interactive flip cards (Singing, Personality, Little Things, Simply Being Herself) with friendly, respectful, non-romantic copy.
4. **Section 4: Unconventional Polaroid Gallery** — Floating, rotated polaroid cards with washi tape details, hover zoom, and lightbox popup modal with handwritten captions.
5. **Section 5: Song Appreciation** — Glowing vinyl music card with dancing sound-wave visualizer, floating musical notes, and play/pause controls.
6. **Section 6: Random Appreciation Generator** — Interactive button that dispenses good vibes with mini confetti pops, plus hidden clickable Easter egg stars.
7. **Section 7: Final Screen & Interactive Handwritten Letter** — Faithfully recreates the wax-sealed postal envelope from the theme reference that unfolds into a lined notebook paper handwritten letter.
