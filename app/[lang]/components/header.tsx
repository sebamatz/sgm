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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-neutral-200" : "bg-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-5 px-6 md:px-8">
        <Link
          href={`/${lang}`}
          className="flex items-center space-x-2 group"
        >
          <span className="text-xl md:text-2xl font-semibold text-neutral-900 tracking-tight">
            SGM
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {["services", "about", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item);
              }}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {translations[item]}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher currentLang={lang} />

          <Button
            className="hidden sm:inline-flex bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-medium px-5 h-10 transition-colors"
            onClick={() => scrollToSection("contact")}
          >
            {translations.getStarted}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden border-neutral-200 h-10 w-10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-white text-neutral-900"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>

              <nav className="flex flex-col space-y-6 mt-12">
                {["services", "about", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item);
                    }}
                    className="text-2xl font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
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
