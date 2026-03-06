"use client";

import Link from "next/link";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
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
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);
  });

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Adjusted for the leaner header height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      setIsOpen(false);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black/95 shadow-2xl" : "bg-transparent"
      }`}
    >
      {/* 🛠️ HEIGHT ADJUSTMENT: Reduced py-6 to py-4 for a leaner mobile profile */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 md:py-6 px-6 md:px-12">
        <Link
          href={`/${lang}`}
          className="flex items-center space-x-4 group z-20"
        >
          <Logo
            className={`text-white transition-all duration-500 ${isScrolled ? "h-7 w-7" : "h-10 w-10 md:h-12 md:w-12"}`}
          />
          <span
            className={`font-black tracking-tighter text-white transition-all duration-500 ${isScrolled ? "text-xl" : "text-2xl md:text-4xl"}`}
          >
            SGM<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center space-x-12">
            {["services", "about", "contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  className="font-bold text-lg text-white/80 hover:text-white transition-colors"
                >
                  {translations[item]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4 z-20">
          {/* 🛠️ SYMMETRY: Language Switcher matches the new smaller Menu button */}
          <LanguageSwitcher currentLang={lang} />

          <Button
            className="hidden sm:inline-flex rounded-full bg-blue-600 hover:bg-white hover:text-black font-bold tracking-tight transition-all duration-300 h-11 px-8 md:h-14 md:px-10 text-lg shadow-xl shadow-blue-600/20"
            onClick={() => scrollToSection("contact")}
          >
            {translations.getStarted}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                /* 🛠️ SIZE ADJUSTMENT: Reduced from h-14 to h-11 for a tighter look */
                className="lg:hidden rounded-full text-white bg-white/5 border-white/10 h-11 w-11"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-[#050505] border-l-white/5 text-white w-full flex flex-col justify-center overflow-hidden p-0"
            >
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
              <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

              <SheetTitle className="sr-only">Navigation</SheetTitle>

              <nav className="flex flex-col space-y-10 text-center z-10">
                {["services", "about", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item);
                    }}
                    className="text-5xl font-black tracking-tighter text-zinc-600 hover:text-white transition-all duration-300 capitalize"
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
