import { translations } from "../../lib/translations";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations];

  return {
    title: `${t.privacy.title} - SGM Software Developers`,
    description: t.privacy.sections.intro.content.substring(0, 160),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations];
  const privacy = t.privacy;

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8 py-32">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-tech-blue mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.services.back}
        </Link>

        <h1 className="heading-display font-semibold tracking-tight text-ink mb-4">
          {privacy.title}
        </h1>

        <p className="text-sm text-ink-light mb-12 font-mono">
          {privacy.lastUpdated}
        </p>

        <div className="space-y-12">
          {Object.entries(privacy.sections).map(([key, section]: [string, any]) => (
            <div key={key}>
              <h2 className="text-2xl font-semibold text-ink mb-4">
                {section.title}
              </h2>
              <p className="text-lg text-ink-light leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "el" },
  ];
}
