"use client";

import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { contactConfig } from "@/app/lib/contact-config";

export default function Footer({ translations }: { translations: any }) {
  const currentYear = new Date().getFullYear();
  const copyright = translations.copyright.replace("{year}", currentYear.toString());

  return (
    <footer className="relative bg-slate-900 py-12 border-t border-slate-800">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-xl font-semibold text-white mb-4 block"
            >
              SGM
            </Link>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              Building innovative software solutions for the modern web.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigate
            </h4>
            <ul className="space-y-2">
              {["Services", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              {contactConfig.github && (
                <Link
                  href={contactConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {contactConfig.linkedIn && (
                <Link
                  href={contactConfig.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
            </div>
            {contactConfig.email && (
              <div>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
                >
                  {contactConfig.email}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-xs">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
