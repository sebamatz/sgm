import type { Metadata } from "next";
import { translations, locales } from "../lib/translations";
import React, { ReactNode } from "react";

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
      <div lang={lang} className="min-h-screen bg-white text-foreground antialiased">
        {children}
      </div>
    </>
  );
}
