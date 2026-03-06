"use client";

import { motion } from "framer-motion";

// Premium, inline SVG representations of top-tier tech brands.
// This ensures perfect scaling, no broken image links, and flawless dark-mode color inheritance.
const brands = [
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 md:h-10 w-auto fill-current">
        <path d="M12 2L24 22H0L12 2Z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    logo: (
      <span className="text-3xl md:text-4xl font-black tracking-tighter lowercase">
        stripe
      </span>
    ),
  },
  {
    name: "GitHub",
    logo: (
      <svg viewBox="0 0 24 24" className="h-9 md:h-11 w-auto fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Framer",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 md:h-10 w-auto fill-current">
        <path d="M4 0h16v8h-8l-8-8zm8 8h8v8h-8v8l-8-8h8V8z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    logo: (
      <svg viewBox="0 0 24 24" className="h-9 md:h-11 w-auto fill-current">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.45 17.34c-.2.325-.62.433-.945.233-2.593-1.583-5.856-1.942-9.704-1.062-.358.082-.718-.142-.8-.5-.082-.358.142-.718.5-.8 4.212-.962 7.82-.562 10.716 1.185.326.2.434.62.233.945zm1.338-2.984c-.25.405-.775.535-1.18.285-2.968-1.824-7.514-2.39-10.842-1.306-.464.15-1-.097-1.15-.562-.15-.465.097-1 .562-1.15 3.842-1.254 8.878-.624 12.324 1.492.406.25.536.776.286 1.18zm.116-3.136c-3.553-2.11-9.423-2.304-12.83-1.272-.548.165-1.127-.145-1.292-.693-.165-.548.145-1.127.693-1.292 3.935-1.192 10.426-.97 14.53 1.47.495.293.66 1.085.367 1.58-.294.495-1.086.66-1.58.368z" />
      </svg>
    ),
  },
  {
    name: "Linear",
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="h-7 md:h-9 w-auto fill-current">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          {/* Faking the Linear logo using the GitHub shape as a base to keep it clean, paired with sharp text */}
        </svg>
        <span className="text-2xl md:text-3xl font-bold tracking-tight">
          Linear
        </span>
      </div>
    ),
  },
];

export default function Clients({ translations }: { translations: any }) {
  // We duplicate the array to create a perfectly seamless infinite scroll loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="relative py-16 md:py-32 bg-gradient-to-b from-[#0a0a0c] to-black overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center mb-16">
        {/* Subtle, tracking-spaced overline */}
        <p className="text-sm font-bold tracking-[0.3em] text-zinc-500 uppercase mb-4">
          Trusted By Industry Leaders
        </p>
        {/* Main Title fading in */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-black tracking-tight text-white"
        >
          {translations.title}
        </motion.h2>
      </div>

      {/* The Infinite Marquee Container */}
      <div className="relative w-full max-w-[100vw] overflow-hidden flex items-center">
        {/* Left & Right Shadow Masks - Creates the illusion they are fading into the void */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black via-[#0a0a0c]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black via-[#0a0a0c]/80 to-transparent z-20" />

        {/* The Scrolling Track */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24"
          animate={{ x: ["0%", "-33.333%"] }} // Scrolls perfectly through exactly one set of the duplicated array
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-none flex justify-center items-center text-zinc-600 hover:text-white transition-colors duration-500 cursor-default"
            >
              {brand.logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
