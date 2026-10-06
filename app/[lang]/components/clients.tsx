"use client";

import { motion } from "framer-motion";
import { Building2, Ship, Shield, Users } from "lucide-react";

const projectCategories = [
  {
    key: "government",
    icon: Shield,
    projects: ["enisa", "epo"],
  },
  {
    key: "travel",
    icon: Ship,
    projects: ["letsferry", "ferriesingreece", "greeka"],
  },
  {
    key: "enterprise",
    icon: Building2,
    projects: ["axiomatics"],
  },
  {
    key: "marketplace",
    icon: Users,
    projects: ["peoplerhour", "aegean"],
  },
];

export default function Clients({ translations }: { translations: any }) {
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative py-16 md:py-32 bg-gradient-to-b from-[#0a0a0c] to-black overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.3em] text-zinc-500 uppercase mb-4">
            {translations.subtitle}
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4"
          >
            {translations.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projectCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: premiumEase }}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors duration-500">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {translations.categories[category.key]}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.projects.map((projectKey) => {
                    const project = translations.items[projectKey];
                    return (
                      <div key={projectKey} className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-base font-semibold text-white">
                            {project.name}
                          </h4>
                          <span className="text-xs text-zinc-500 whitespace-nowrap">
                            {project.role}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {project.client}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            Notable Organizations
          </h3>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <span className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
              ENISA (EU Agency for Cybersecurity)
            </span>
            <span className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
              European Patent Office
            </span>
            <span className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
              Uni Systems
            </span>
            <span className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
              ARHS Developments (Accenture Group)
            </span>
            <span className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
              Sword Group
            </span>
            <span className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
              PeoplePerHour
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
