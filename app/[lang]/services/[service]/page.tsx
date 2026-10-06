import { notFound } from "next/navigation";
import { translations, locales } from "../../../lib/translations";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}): Promise<Metadata> {
  const { lang, service } = await params;
  const t = translations[lang as keyof typeof translations];

  if (!t || !t.services) {
    return {};
  }

  const serviceData = t.services[service as keyof typeof t.services];

  if (!serviceData || typeof serviceData === "string") {
    return {};
  }

  const baseUrl = "https://www.sgmsoftware.gr";
  const currentUrl = `${baseUrl}/${lang}/services/${service}`;

  const alternateLanguages = locales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}/${locale}/services/${service}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: `${serviceData.title} - SGM Software Developers`,
    description: serviceData.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        ...alternateLanguages,
        "x-default": `${baseUrl}/en/services/${service}`,
      },
    },
    openGraph: {
      title: `${serviceData.title} - SGM Software Developers`,
      description: serviceData.description,
      url: currentUrl,
      siteName: "SGM Software Developers",
      locale: lang === "el" ? "el_GR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${serviceData.title} - SGM Software Developers`,
      description: serviceData.description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service } = await params;

  const t = translations[lang as keyof typeof translations];

  if (!t || !t.services) {
    notFound();
  }

  const serviceData = t.services[service as keyof typeof t.services];

  if (!serviceData || typeof serviceData === "string") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8 py-32">
        <Link
          href={`/${lang}#services`}
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-6">
          {serviceData.title}
        </h1>

        <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
          {serviceData.description}
        </p>

        <div className="w-16 h-px bg-neutral-200 mb-12" />

        <div className="prose prose-neutral max-w-none">
          <p className="text-lg text-neutral-700 leading-relaxed">
            {serviceData.longDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { lang: "en", service: "frontend" },
    { lang: "en", service: "custom" },
    { lang: "en", service: "consulting" },
    { lang: "en", service: "platforms" },
    { lang: "en", service: "enterprise" },
    { lang: "en", service: "modernization" },
    { lang: "el", service: "frontend" },
    { lang: "el", service: "custom" },
    { lang: "el", service: "consulting" },
    { lang: "el", service: "platforms" },
    { lang: "el", service: "enterprise" },
    { lang: "el", service: "modernization" },
  ];
}
