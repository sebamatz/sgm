"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/language-switcher";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header({
  lang,
  translations,
}: {
  lang: string;
  translations: any;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      setIsOpen(false);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200"
          : "bg-navy-base/80 backdrop-blur-md"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-8">
        <Link
          href={`/${lang}`}
          className="flex items-center space-x-2 group"
        >
          <span className={`text-xl md:text-2xl font-mono font-semibold tracking-tight transition-colors ${
            isScrolled ? "text-ink" : "text-white"
          }`}>
            <span className={isScrolled ? "text-tech-blue" : "text-tech-cyan"}>{"<"}</span>
            SGM
            <span className={isScrolled ? "text-tech-blue" : "text-tech-cyan"}>{" />"}</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {["services", "aiAgents", "about", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item === "aiAgents" ? "ai-agents" : item}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item === "aiAgents" ? "ai-agents" : item);
              }}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-ink-light hover:text-ink"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {translations[item]}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher currentLang={lang} />

          <Button
            className="hidden sm:inline-flex bg-tech-blue hover:bg-tech-cyan text-white text-sm font-mono font-medium px-5 h-10 transition-all shadow-md shadow-tech-blue/20"
            onClick={() => scrollToSection("contact")}
          >
            {translations.getStarted}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden h-10 w-10 bg-transparent transition-colors focus-visible:ring-2 focus-visible:ring-tech-cyan ${
                  isScrolled
                    ? "border border-slate-300 text-ink hover:bg-slate-100 hover:text-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    : "border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-base"
                }`}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-white text-ink"
            >
              <SheetTitle className="sr-only">{translations.navigation}</SheetTitle>

              <nav className="flex flex-col space-y-6 mt-12">
                {["services", "aiAgents", "about", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item === "aiAgents" ? "ai-agents" : item}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item === "aiAgents" ? "ai-agents" : item);
                    }}
                    className="text-2xl font-medium text-ink-light hover:text-ink transition-colors"
                  >
                    {translations[item]}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
