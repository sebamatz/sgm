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
    <section className="relative min-h-[90vh] w-full flex items-center bg-black overflow-hidden">
      {/* Grid background with fade */}
      <div className="absolute inset-0 grid-pattern grid-fade opacity-40" />
      
      {/* Soft neutral glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neutral-800/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-32 md:py-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-8 text-white leading-[1.1]">
              {translations.title}
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl leading-relaxed">
              {translations.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollToSection("services")}
                className="bg-tech-blue hover:bg-tech-cyan text-white px-8 h-12 text-base font-medium transition-all shadow-lg shadow-tech-blue/30 hover:shadow-tech-blue/50"
              >
                {translations.cta}
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-transparent border border-white/20 text-white hover:border-tech-cyan hover:text-tech-cyan px-8 h-12 text-base font-mono font-medium transition-all"
              >
                {translations.contact}
              </Button>
            </div>
          </div>

          {/* Code Editor Window */}
          <div className="hidden lg:block">
            <div className="bg-[#111] backdrop-blur-sm border border-[#262626] rounded-lg overflow-hidden shadow-2xl" aria-hidden="true">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/80 border-b border-neutral-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 text-xs font-mono text-neutral-500">sgm.ts</span>
              </div>
              
              {/* Code content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="text-neutral-500">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">sgm</span>{" "}
                  <span className="text-neutral-400">=</span>{" "}
                  <span className="text-yellow-400">{"{"}</span>
                </div>
                <div className="text-neutral-500 ml-4">
                  <span className="text-blue-300">name</span>
                  <span className="text-neutral-400">:</span>{" "}
                  <span className="text-green-400">'SGM Software Developers'</span>
                  <span className="text-neutral-400">,</span>
                </div>
                <div className="text-neutral-500 ml-4">
                  <span className="text-blue-300">services</span>
                  <span className="text-neutral-400">:</span>{" "}
                  <span className="text-yellow-400">[</span>
                </div>
                <div className="text-neutral-500 ml-8">
                  <span className="text-green-400">'Frontend'</span>
                  <span className="text-neutral-400">,</span>{" "}
                  <span className="text-green-400">'Custom Apps'</span>
                  <span className="text-neutral-400">,</span>
                </div>
                <div className="text-neutral-500 ml-8">
                  <span className="text-green-400">'Consulting'</span>
                  <span className="text-neutral-400">,</span>{" "}
                  <span className="text-green-400">'Enterprise'</span>
                </div>
                <div className="text-neutral-500 ml-4">
                  <span className="text-yellow-400">]</span>
                  <span className="text-neutral-400">,</span>
                </div>
                <div className="text-neutral-500 ml-4">
                  <span className="text-blue-300">stack</span>
                  <span className="text-neutral-400">:</span>{" "}
                  <span className="text-yellow-400">[</span>
                </div>
                <div className="text-neutral-500 ml-8">
                  <span className="text-green-400">'React'</span>
                  <span className="text-neutral-400">,</span>{" "}
                  <span className="text-green-400">'Next.js'</span>
                  <span className="text-neutral-400">,</span>{" "}
                  <span className="text-green-400">'TypeScript'</span>
                </div>
                <div className="text-neutral-500 ml-4">
                  <span className="text-yellow-400">]</span>
                  <span className="text-neutral-400">,</span>
                </div>
                <div className="text-neutral-500 ml-4">
                  <span className="text-blue-300">location</span>
                  <span className="text-neutral-400">:</span>{" "}
                  <span className="text-green-400">'Greece · Remote'</span>
                </div>
                <div className="text-neutral-500">
                  <span className="text-yellow-400">{"}"}</span>
                  <span className="text-tech-cyan cursor-blink">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
