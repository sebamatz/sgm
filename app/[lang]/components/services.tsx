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
  frontend: <Code className="h-6 w-6 text-neutral-900" />,
  custom: <Server className="h-6 w-6 text-neutral-900" />,
  consulting: <Users className="h-6 w-6 text-neutral-900" />,
  platforms: <Smartphone className="h-6 w-6 text-neutral-900" />,
  enterprise: <Database className="h-6 w-6 text-neutral-900" />,
  modernization: <RefreshCw className="h-6 w-6 text-neutral-900" />,
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
      className="relative py-20 md:py-32 bg-neutral-50"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-4">
            {translations.title}
          </h2>
          <div className="w-16 h-px bg-neutral-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.key}
              href={`/${lang}/services/${service.key}`}
              className="group block p-8 border border-neutral-200 hover:border-neutral-900 transition-colors bg-white"
            >
              <div className="mb-6">
                {serviceIcons[service.key as keyof typeof serviceIcons]}
              </div>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {service.title}
              </h3>

              <p className="text-neutral-600 leading-relaxed text-sm">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
