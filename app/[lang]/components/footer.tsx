"use client";

import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { contactConfig } from "@/app/lib/contact-config";

export default function Footer({
  lang,
  translations,
  headerTranslations,
}: {
  lang: string;
  translations: any;
  headerTranslations: any;
}) {
  const currentYear = new Date().getFullYear();
  const copyright = translations.copyright.replace("{year}", currentYear.toString());

  return (
    <footer className="relative bg-navy-base py-12 border-t border-slate-800">
      {/* Faint grid background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-xl font-semibold text-white mb-4 block"
            >
              SGM
            </Link>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed font-mono">
              {translations.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-white font-mono font-semibold mb-4 text-xs uppercase tracking-wider">
              {translations.navigate}
            </h4>
            <ul className="space-y-2">
              {[
                { key: "services", label: headerTranslations.services },
                { key: "ai-agents", label: headerTranslations.aiAgents },
                { key: "about", label: headerTranslations.about },
                { key: "contact", label: headerTranslations.contact },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={`#${item.key}`}
                    className="text-slate-400 hover:text-tech-cyan transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${lang}/privacy`}
                  className="text-slate-400 hover:text-tech-cyan transition-colors text-sm"
                >
                  {translations.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono font-semibold mb-4 text-xs uppercase tracking-wider">
              {translations.connect}
            </h4>
            <div className="flex gap-4 mb-6">
              {contactConfig.github && (
                <Link
                  href={contactConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-tech-cyan transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {contactConfig.linkedIn && (
                <Link
                  href={contactConfig.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-tech-cyan transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
            </div>
            {contactConfig.email && (
              <div>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="text-slate-400 hover:text-tech-cyan text-sm font-mono transition-colors"
                >
                  {contactConfig.email}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-xs font-mono">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
