"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Terminal } from "lucide-react";
import Link from "next/link";

export default function Footer({ translations }: { translations: any }) {
  const currentYear = new Date().getFullYear();
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  return (
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Subtle Background Glow - Symmetrical to the Contact section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand & Mission Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-white mb-6 block"
            >
              SGM<span className="text-blue-500">.</span>
            </Link>
            <p className="text-zinc-500 max-w-sm text-lg leading-relaxed font-medium">
              Architecting high-performance digital systems with 3D immersion
              and "Over-Kill" technical precision.
            </p>
          </div>

          {/* Navigational Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">
              Project
            </h4>
            <ul className="space-y-4">
              {["Services", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-zinc-400 hover:text-white transition-colors duration-300 font-medium text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">
              Connect
            </h4>
            <div className="flex gap-5">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Github className="h-5 w-5 text-zinc-500 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/sevastos-matzouranis/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Linkedin className="h-5 w-5 text-zinc-500 group-hover:text-blue-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Twitter className="h-5 w-5 text-zinc-500 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300" />
              </Link>
            </div>
            <div className="mt-8">
              <a
                href="mailto:hello@sgmsoftware.com"
                className="text-zinc-500 hover:text-white text-sm font-medium transition-colors"
              >
                hello@sgmsoftware.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Status & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-zinc-600 text-[11px] font-bold uppercase tracking-wider">
              {translations.copyright || `© ${currentYear} SGM SOFTWARE`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
