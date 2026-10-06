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

  const categoryColors: Record<string, string> = {
    government: "bg-indigo-100 text-indigo-700 border-indigo-200",
    travel: "bg-blue-100 text-blue-700 border-blue-200",
    enterprise: "bg-purple-100 text-purple-700 border-purple-200",
    marketplace: "bg-cyan-100 text-cyan-700 border-cyan-200",
  };

  return (
    <section className="relative py-20 md:py-32 bg-white" id="projects">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-semibold tracking-wider text-indigo-600 uppercase mb-3">
            {t.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
            {t.title}
          </h2>
          <div className="w-16 h-px bg-indigo-600" />
        </div>

        <div className="space-y-16">
          {Object.entries(projectsByCategory).map(([categoryKey, projectKeys]) => (
            <div key={categoryKey}>
              <div className="mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[categoryKey]}`}>
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
                      className="p-6 bg-indigo-50/30 border border-indigo-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-wrap items-start gap-3 mb-3">
                        <h4 className="text-lg font-semibold text-slate-900">
                          {project.name}
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                          isTeamMember 
                            ? 'bg-slate-100 text-slate-700 border border-slate-200' 
                            : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        }`}>
                          {isTeamMember ? t.roleTeamMember : t.roleFreelance}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                        <span>{project.client}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-medium text-indigo-700">{project.role}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
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
