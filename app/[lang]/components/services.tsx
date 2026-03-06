"use client";

import { motion, Variants, BezierDefinition } from "framer-motion";
import {
  Code,
  Server,
  Smartphone,
  Database,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const serviceIcons = {
  web: (
    <Code className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110" />
  ),
  backend: (
    <Server className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110" />
  ),
  mobile: (
    <Smartphone className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110" />
  ),
  erp: (
    <Database className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110" />
  ),
  legacy: (
    <RefreshCw className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110" />
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const premiumEase: BezierDefinition = [0.16, 1, 0.3, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
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
      key: "web",
      title: translations.web.title,
      description: translations.web.description,
    },
    {
      key: "backend",
      title: translations.backend.title,
      description: translations.backend.description,
    },
    {
      key: "mobile",
      title: translations.mobile.title,
      description: translations.mobile.description,
    },
    {
      key: "erp",
      title: translations.erp.title,
      description: translations.erp.description,
    },
    {
      key: "legacy",
      title: translations.legacy.title,
      description: translations.legacy.description,
    },
  ];

  return (
    <section
      id={id || "services"}
      className="relative py-16 md:py-32 bg-[#0a0a0c] overflow-hidden flex justify-center"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 pb-2"
          >
            {translations.title}
          </motion.h2>

          {/* THE NEW SWEEPING LIGHT BEAM */}
          <div className="relative mt-8 w-full max-w-lg h-[1px] bg-white/10 rounded-full">
            {/* The sweeping trail */}
            <motion.div
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              className="absolute top-0 h-full w-32 -ml-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80"
            />
            {/* The glowing dot tracking back and forth */}
            <motion.div
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_4px_rgba(59,130,246,0.9)] border-[1.5px] border-white z-10"
            />
          </div>
        </div>
        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.key} variants={cardVariants}>
              <Link
                href={`/${lang}/services/${service.key}`}
                className="block h-full outline-none"
              >
                <div className="group relative h-full flex flex-col p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden">
                  {/* Top shimmer border */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon Container */}
                  <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit border border-white/5 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors duration-500">
                    {serviceIcons[service.key as keyof typeof serviceIcons]}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed mb-10 flex-grow font-medium">
                    {service.description}
                  </p>

                  <div className="mt-auto flex items-center text-sm font-bold uppercase tracking-widest text-blue-500/70 group-hover:text-blue-400 transition-colors duration-300">
                    More info
                    <ArrowRight className="ml-3 h-4 w-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                  </div>

                  {/* Glass highlight effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
