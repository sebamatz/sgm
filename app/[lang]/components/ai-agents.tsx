"use client";

import { Zap, Cog, ShieldCheck, Lock } from "lucide-react";

export default function AIAgents({
  translations,
  id,
}: {
  translations: any;
  id?: string;
}) {
  const benefits = [
    {
      key: "speed",
      icon: <Zap className="h-5 w-5 text-tech-cyan" />,
      title: translations.benefits.speed.title,
      description: translations.benefits.speed.description,
    },
    {
      key: "automation",
      icon: <Cog className="h-5 w-5 text-tech-cyan" />,
      title: translations.benefits.automation.title,
      description: translations.benefits.automation.description,
    },
    {
      key: "oversight",
      icon: <ShieldCheck className="h-5 w-5 text-tech-cyan" />,
      title: translations.benefits.oversight.title,
      description: translations.benefits.oversight.description,
    },
    {
      key: "security",
      icon: <Lock className="h-5 w-5 text-tech-cyan" />,
      title: translations.benefits.security.title,
      description: translations.benefits.security.description,
    },
  ];

  return (
    <section
      id={id || "ai-agents"}
      className="relative py-20 md:py-32 bg-navy-base overflow-hidden"
    >
      {/* Grid background with fade */}
      <div className="absolute inset-0 grid-pattern grid-fade opacity-30" />
      
      {/* Soft accent glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-tech-cyan/10 rounded-full blur-[140px]" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            02 / ai agents
          </p>
          <h2 className="heading-section font-semibold tracking-tight text-white mb-6">
            {translations.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">
            {translations.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Agent Terminal/Log Visual */}
          <div
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg overflow-hidden shadow-2xl"
            aria-hidden="true"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-2 text-xs font-mono text-slate-500">
                agent-workflow.log
              </span>
            </div>

            {/* Agent log content */}
            <div className="p-6 font-mono text-sm leading-loose space-y-2">
              <div className="text-slate-500">
                <span className="text-purple-400">$</span>{" "}
                <span className="text-blue-400">agent.run</span>
                <span className="text-slate-400">(</span>
                <span className="text-green-400">task</span>
                <span className="text-slate-400">)</span>
              </div>
              
              <div className="text-slate-500 ml-2">
                <span className="text-tech-cyan">→</span>{" "}
                <span className="text-slate-400">{translations.steps.step1}</span>
              </div>
              
              <div className="text-slate-500 ml-2">
                <span className="text-green-400">✓</span>{" "}
                <span className="text-slate-300">{translations.steps.step2}</span>
              </div>
              
              <div className="text-slate-500 ml-2">
                <span className="text-green-400">✓</span>{" "}
                <span className="text-slate-300">{translations.steps.step3}</span>
              </div>
              
              <div className="text-slate-500 ml-2">
                <span className="text-yellow-400">⏸</span>{" "}
                <span className="text-yellow-400">{translations.steps.step4}</span>
              </div>
              
              <div className="text-slate-500 ml-2">
                <span className="text-green-400">✓</span>{" "}
                <span className="text-green-300">{translations.steps.step5}</span>
              </div>
              
              <div className="text-slate-500 ml-2">
                <span className="text-green-400">✓</span>{" "}
                <span className="text-slate-300">{translations.steps.step6}</span>
              </div>
              
              <div className="text-slate-500 mt-4">
                <span className="text-green-400">SUCCESS</span>
                <span className="text-slate-400">:</span>{" "}
                <span className="text-slate-400">{translations.steps.complete}</span>
              </div>
            </div>
          </div>

          {/* Descriptive text with real content */}
          <div className="flex flex-col justify-center space-y-6">
            <p className="text-slate-300 leading-relaxed">
              {translations.description1}
            </p>
            <p className="text-slate-400 leading-relaxed">
              {translations.description2}
            </p>
            <p className="text-slate-400 leading-relaxed">
              {translations.description3}
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.key}
              className="p-6 bg-slate-900/30 border border-slate-800 hover:border-tech-cyan/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-800/50">
                  {benefit.icon}
                </div>
                <span className="text-xs font-mono text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
