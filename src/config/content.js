/**
 * Central configuration file for Swetha's appreciation page
 */

export const siteConfig = {
  recipientName: "Swetha",
  headerBadge: "FOR MY FRIEND",
  headerSubnote: "Just because. You sang a song, so I made you this.",
  sealInitial: "A", // Abhinaw

  // Section 1: Opening Screen
  opening: {
    greeting: "Hey, Swetha! ✨",
    tagline: "Just a reminder of how wonderful a friend you are.",
    description: "Thought I would make something special to appreciate you, thank you for the song, and hopefully bring a smile to your face.",
    subtext: "A little appreciation corner, made just for you.",
    ctaButtonText: "Let's see what you've got →",
  },

  // Section 2: Interactive Scratch Card
  scratchCard: {
    badge: "✨ SCRATCH TO REVEAL",
    title: "Scratch to reveal ✨",
    scratchSurfaceText: "Scratch right here! ✨",
    revealedImage: "/images/swetha.jpeg",
    revealedImageAlt: "Swetha",
    postRevealMessage: "The prettiest girl! ✨",
    postRevealSubtext: "Thank you for being such an awesome and sweet friend.",
  },

  // Section 3: Dedicated Song ("Tareef Karu Kya Uski")
  songSection: {
    heading: "This song describes you 🎵",
    subtitle: "Dedicated to a truly wonderful and kind friend.",
    quote: "Thank you so much for singing that song for me! I genuinely loved listening to it. You have a really pleasant voice, and this song felt like the perfect match for you.",
    trackTitle: "Tareef Karu Kya Uski",
    artistName: "Dedicated to Swetha ✨",
    audioSrc: "/audio/tareef-karu-kya.mp3",
    duration: "4:15",
  },

  // Section 4: 4 Appreciation Cards
  appreciationCards: {
    heading: "Things worth appreciating about YOU",
    subheading: "Tap each card to read a friendly note ✨",
    cards: [
      {
        id: "voice",
        emoji: "🎵",
        title: "That lovely voice",
        tag: "Talent",
        gradient: "from-[#FFE2E6] via-[#FFD1DC] to-[#FCA5B8]",
        borderAccent: "#F472B6",
        frontSummary: "When you sang, it was genuinely delightful to hear. You have a natural, effortless tone.",
        backMessage: "Thank you again for singing for me! You honestly have a lovely voice that puts a smile on anyone's face. Keep singing whenever you feel like it!",
      },
      {
        id: "sweet",
        emoji: "🌷",
        title: "So genuinely kind",
        tag: "Kindness",
        gradient: "from-[#FFF1E6] via-[#FFE4D6] to-[#FED7AA]",
        borderAccent: "#FB923C",
        frontSummary: "You have a natural warmth and sweet nature that makes conversations easy and pleasant.",
        backMessage: "You really are one of the sweetest people to talk to. Your polite nature, positive attitude, and genuine kindness are things everyone appreciates.",
      },
      {
        id: "smile",
        emoji: "✨",
        title: "Bright & cheerful smile",
        tag: "Good Vibes",
        gradient: "from-[#F3E8FF] via-[#E9D5FF] to-[#D8B4FE]",
        borderAccent: "#A855F7",
        frontSummary: "A bright, cheerful presence that effortlessly brings positivity to any moment.",
        backMessage: "Your cheerful energy is contagious and lights up every interaction. Keep smiling and spreading that great energy!",
      },
      {
        id: "friendship",
        emoji: "🌟",
        title: "An awesome friend",
        tag: "Friendship",
        gradient: "from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC]",
        borderAccent: "#38BDF8",
        frontSummary: "Thoughtful, delightfully fun to chat with, and a dependable friend.",
        backMessage: "Having you as a friend is wonderful. Thank you for the laughs, the great chats, and for simply being your awesome self!",
      },
    ],
  },

  // Section 5: Auto-Carousel Wishes
  wishesSection: {
    heading: "One last thing... actually, three wishes ✨",
    subheading: "A few genuine wishes straight from the heart.",
    wishes: [
      {
        id: 1,
        emoji: "✨",
        text: "Keep smiling and shining bright, always!",
      },
      {
        id: 2,
        emoji: "🌟",
        text: "May you achieve immense success in whatever path you choose.",
      },
      {
        id: 3,
        emoji: "🤍",
        text: "May peace, happiness, and good fortune always be by your side.",
      },
    ],
  },

  // Section 6: Final Section & Letter
  finalSection: {
    heading: "And that's my little appreciation project!",
    message1: "Just wanted to do something creative and remind you that you're an awesome and truly kind friend. Thank you for the song, the laughs, and the great chats.",
    message2: "Keep smiling, keep singing, and keep being your wonderful self.",
    message3: "Hope this brought a big smile to your face! :)",
    footer: "— Made with appreciation for Swetha.",

    letter: {
      envelopeBadge: "✉️ Tap to open your letter",
      letterTitle: "Hey Swetha,",
      letterBody: [
        "I was thinking about how nice it is to have such a sweet, kind-hearted friend in you, especially after you sang that song for me.",
        "It's rare to come across people who are so genuine, pleasant to talk to, and willing to share their talents so freely.",
        "Whenever life feels busy, remember how much you're appreciated. Keep doing what you love, keep that awesome smile going, and stay the wonderful person you are!",
        "Always here cheering for you,"
      ],
      signature: "Your friend, Abhinaw 🤍",
    },
  },
};
