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
    <section className="relative min-h-[85vh] w-full flex items-center bg-white overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 opacity-60" />
      
      {/* Soft blurred accent shapes */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-300 rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-[100px] opacity-15" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-32 md:py-40 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 text-slate-900 leading-[1.1]">
            {translations.title.split(' ').map((word: string, i: number) => (
              <span key={i}>
                {i === 0 ? (
                  <span className="text-indigo-700">{word}</span>
                ) : (
                  word
                )}{' '}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed">
            {translations.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => scrollToSection("services")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 text-base font-medium transition-colors shadow-lg shadow-indigo-200"
            >
              {translations.cta}
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8 h-12 text-base font-medium transition-colors"
            >
              {translations.contact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
