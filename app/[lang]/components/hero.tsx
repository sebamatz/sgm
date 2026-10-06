"use client";

import { Button } from "@/components/ui/button";

export default function Hero({ translations }: { translations: any }) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[80vh] w-full flex items-center bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-32 md:py-40">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 text-neutral-900 leading-[1.1]">
            {translations.title}
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-2xl leading-relaxed">
            {translations.subtitle}
          </p>

          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-neutral-900 hover:bg-neutral-700 text-white px-8 h-12 text-base font-medium transition-colors"
          >
            {translations.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
