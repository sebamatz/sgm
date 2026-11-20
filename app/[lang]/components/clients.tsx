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
    <section className="relative py-20 md:py-32 bg-slate-50" id="projects">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-light mb-4">
            {t.sectionLabel}
          </p>
          <h2 className="heading-section font-semibold tracking-tight text-ink mb-4">
            {t.title}
          </h2>
        </div>

        <div className="space-y-16">
          {Object.entries(projectsByCategory).map(([categoryKey, projectKeys]) => (
            <div key={categoryKey}>
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 text-xs font-mono text-tech-blue border border-tech-blue/30 bg-tech-blue/5">
                  {categories[categoryKey as keyof typeof categories]}
                </span>
              </div>
              <div className="space-y-6">
                {projectKeys.map((key) => {
                  const project = items[key as keyof typeof items];

                  return (
                    <div
                      key={key}
                      className="p-6 border border-slate-200 bg-white hover:border-tech-blue/50 hover:shadow-lg hover:shadow-tech-blue/5 transition-all duration-300"
                    >
                      <h4 className="text-lg font-semibold text-ink mb-3">
                        {project.name}
                      </h4>
                      {project.client ? (
                        <p className="text-sm text-ink-light mb-3 font-mono">
                          {project.client}
                        </p>
                      ) : null}
                      <p className="text-ink-light leading-relaxed">
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
