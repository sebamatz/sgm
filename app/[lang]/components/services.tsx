"use client";

import {
  Code,
  Server,
  Smartphone,
  Database,
  RefreshCw,
  Users,
} from "lucide-react";
import Link from "next/link";

const serviceIcons = {
  frontend: <Code className="h-5 w-5 text-tech-blue" />,
  custom: <Server className="h-5 w-5 text-tech-blue" />,
  consulting: <Users className="h-5 w-5 text-tech-blue" />,
  platforms: <Smartphone className="h-5 w-5 text-tech-blue" />,
  enterprise: <Database className="h-5 w-5 text-tech-blue" />,
  modernization: <RefreshCw className="h-5 w-5 text-tech-blue" />,
};

export default function Services({
  lang,
  translations,
  id,
}: {
  lang: string;
  translations: any;
  id?: string;
}) {
  const services = [
    {
      key: "frontend",
      title: translations.frontend.title,
      description: translations.frontend.description,
    },
    {
      key: "custom",
      title: translations.custom.title,
      description: translations.custom.description,
    },
    {
      key: "consulting",
      title: translations.consulting.title,
      description: translations.consulting.description,
    },
    {
      key: "platforms",
      title: translations.platforms.title,
      description: translations.platforms.description,
    },
    {
      key: "enterprise",
      title: translations.enterprise.title,
      description: translations.enterprise.description,
    },
    {
      key: "modernization",
      title: translations.modernization.title,
      description: translations.modernization.description,
    },
  ];

  return (
    <section
      id={id || "services"}
      className="relative py-20 md:py-32 bg-white"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-light mb-4">
            01 / services
          </p>
          <h2 className="heading-section font-semibold tracking-tight text-ink mb-4">
            {translations.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.key}
              href={`/${lang}/services/${service.key}`}
              className="group block p-8 border border-slate-200 hover:border-tech-blue hover:shadow-lg hover:shadow-tech-blue/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-slate-100">
                  {serviceIcons[service.key as keyof typeof serviceIcons]}
                </div>
                <span className="text-xs font-mono text-ink-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-ink mb-3 group-hover:text-tech-blue transition-colors">
                {service.title}
              </h3>

              <p className="text-ink-light leading-relaxed text-sm mb-4">
                {service.description}
              </p>
              
              <span className="inline-flex items-center text-xs font-mono text-tech-blue opacity-0 group-hover:opacity-100 transition-opacity">
                {translations.viewDetails}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
