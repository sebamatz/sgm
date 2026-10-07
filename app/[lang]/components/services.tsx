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
      className="relative py-20 md:py-32 bg-[#0F172A] border-t border-slate-800"
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            01 / services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
            {translations.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.key}
              href={`/${lang}/services/${service.key}`}
              className="group block p-8 border border-slate-800 bg-slate-900/30 hover:border-tech-cyan/50 hover:shadow-lg hover:shadow-tech-cyan/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-slate-800/50">
                  {serviceIcons[service.key as keyof typeof serviceIcons]}
                </div>
                <span className="text-xs font-mono text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-tech-cyan transition-colors">
                {service.title}
              </h3>

              <p className="text-slate-400 leading-relaxed text-sm mb-4">
                {service.description}
              </p>
              
              <span className="inline-flex items-center text-xs font-mono text-tech-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                view details →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
