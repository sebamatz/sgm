import type { Metadata } from "next";
import { translations, locales } from "../lib/translations";
import React, { ReactNode } from "react";
import { GoogleAnalytics } from "../lib/analytics";
import CookieConsent from "./components/cookie-consent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations] || translations.en;

  // Domain-specific base URLs
  const grBase = "https://www.sgmsoftware.gr";
  const comBase = "https://www.sgmsoftware.com";
  
  // Greek pages canonical on .gr, English on .com
  const canonicalBase = lang === "el" ? grBase : comBase;
  const currentUrl = `${canonicalBase}/${lang}`;

  // hreflang alternates across domains
  const alternateLanguages = {
    en: `${comBase}/en`,
    el: `${grBase}/el`,
  };

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        ...alternateLanguages,
        "x-default": `${comBase}/en`,
      },
    },
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      url: currentUrl,
      siteName: "SGM Software Developers",
      locale: lang === "el" ? "el_GR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.metadata.title,
      description: t.metadata.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations];

  return (
    <>
      <GoogleAnalytics />
      <div lang={lang} className="min-h-screen bg-navy-base text-foreground antialiased">
        {children}
        <CookieConsent lang={lang} translations={t.cookieConsent} />
      </div>
    </>
  );
}
