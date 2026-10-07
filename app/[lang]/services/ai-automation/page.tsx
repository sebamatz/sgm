"use client";
import { use } from "react";

import { notFound } from "next/navigation";
import { translations } from "../../../lib/translations";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Contact from "../../components/contact";

export default function AIAutomationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const t = translations[lang as keyof typeof translations];

  if (!t) {
    notFound();
  }

  const page = t.landingPages.aiAutomation;

  const scrollToContact = () => {
    if (typeof window !== "undefined") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-navy-base overflow-hidden">
          <div className="absolute inset-0 grid-pattern grid-fade opacity-40" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-tech-blue/20 rounded-full blur-[120px]" />

          <div className="w-full max-w-4xl mx-auto px-6 md:px-8 relative z-10">
            <Link
              href={`/${lang}#services`}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-tech-cyan mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t.services.back}
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
              {page.hero.title}
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
              {page.hero.subtitle}
            </p>

            <Button
              onClick={scrollToContact}
              className="bg-tech-blue hover:bg-tech-cyan text-white px-8 h-12 text-base font-medium transition-all shadow-lg shadow-tech-blue/30"
            >
              {page.hero.cta}
            </Button>
          </div>
        </section>

        <section className="relative py-20 md:py-32 bg-white">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink mb-12">
              {page.problems.title}
            </h2>

            <div className="space-y-6">
              {page.problems.items.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-tech-blue flex-shrink-0 mt-1" />
                  <p className="text-lg text-ink-light leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-32 bg-slate-50">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink mb-12">
              {page.process.title}
            </h2>

            <div className="space-y-8">
              {page.process.steps.map((step: { title: string; description: string }, index: number) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-tech-blue/10 border border-tech-blue/30 flex items-center justify-center">
                      <span className="text-tech-blue font-mono font-semibold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink mb-2">
                      {step.title}
                    </h3>
                    <p className="text-ink-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-32 bg-white">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink mb-12">
              {page.faq.title}
            </h2>

            <div className="space-y-8">
              {page.faq.items.map((item: { question: string; answer: string }, index: number) => (
                <div key={index} className="border-l-2 border-tech-blue/30 pl-6">
                  <h3 className="text-lg font-semibold text-ink mb-3">
                    {item.question}
                  </h3>
                  <p className="text-ink-light leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact lang={lang} translations={t.contact} id="contact" />
      </div>
    </>
  );
}
