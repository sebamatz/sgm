"use client";

export default function Clients({ translations }: { translations: any }) {
  const t = translations;
  const categories = t.categories;
  const items = t.items;

  const projectsByCategory = {
    government: ["enisa", "epo"],
    travel: ["letsferry", "ferriesingreece", "aegean"],
    enterprise: ["axiomatics"],
    marketplace: ["peoplerhour", "greeka"],
  };

  return (
    <section className="relative py-20 md:py-32 bg-[#111] border-t border-neutral-800" id="projects">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-4">
            03 / projects
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
            {t.title}
          </h2>
        </div>

        <div className="space-y-16">
          {Object.entries(projectsByCategory).map(([categoryKey, projectKeys]) => (
            <div key={categoryKey}>
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 text-xs font-mono text-tech-cyan border border-tech-cyan/30 bg-tech-cyan/5">
                  {categories[categoryKey as keyof typeof categories]}
                </span>
              </div>
              <div className="space-y-6">
                {projectKeys.map((key) => {
                  const project = items[key as keyof typeof items];
                  const isTeamMember = project.role.toLowerCase().includes('team member') || project.role.toLowerCase().includes('μέλος ομάδας');
                  
                  return (
                    <div
                      key={key}
                      className="p-6 border border-[#262626] bg-[#111] hover:border-tech-cyan/50 hover:shadow-lg hover:shadow-tech-cyan/5 transition-all duration-300"
                    >
                      <div className="flex flex-wrap items-start gap-3 mb-3">
                        <h4 className="text-lg font-semibold text-white">
                          {project.name}
                        </h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-mono border border-neutral-700 text-neutral-400">
                          {isTeamMember ? t.roleTeamMember : t.roleFreelance}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-400 mb-3 font-mono">
                        <span>{project.client}</span>
                        <span className="text-neutral-600">·</span>
                        <span>{project.role}</span>
                      </div>
                      <p className="text-neutral-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
