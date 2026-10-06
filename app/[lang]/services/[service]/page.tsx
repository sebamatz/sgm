import { notFound } from "next/navigation";
import { translations, locales } from "../../../lib/translations";
import type { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";
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
    <div className="min-h-screen flex flex-col bg-black">
      <Header lang={lang} translations={t.header} />
      <main className="flex-1">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-32">
          <Link
            href={`/${lang}#services`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t.header.services}</span>
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            {serviceData.title}
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed">
            {serviceData.description}
          </p>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl">
              <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
                {serviceData.longDescription}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer translations={t.footer} />
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
