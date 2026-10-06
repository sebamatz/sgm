import type { Metadata } from "next";
import { translations, locales } from "../lib/translations";
import React, { ReactNode } from "react";
import SmoothScroll from "../../components/SmoothScroll";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations] || translations.en;

  const baseUrl = "https://www.sgmsoftware.gr";
  const currentUrl = `${baseUrl}/${lang}`;

  const alternateLanguages = locales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}/${locale}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        ...alternateLanguages,
        "x-default": `${baseUrl}/en`,
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

  return (
    <>
      {/* CSS Preload Killer */}
      <span className="sr-only opacity-0 invisible" aria-hidden="true" />

      {/* Main App Wrapper */}
      <div lang={lang} className="min-h-screen bg-[#050505] text-foreground antialiased selection:bg-white selection:text-black overflow-x-hidden">
        <SmoothScroll>{children as any}</SmoothScroll>
      </div>
    </>
  );
}
