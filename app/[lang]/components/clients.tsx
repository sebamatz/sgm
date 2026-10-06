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
    <section className="relative py-20 md:py-32 bg-white border-t border-neutral-200" id="projects">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-4">
            {t.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-4">
            {t.title}
          </h2>
          <div className="w-16 h-px bg-neutral-900" />
        </div>

        <div className="space-y-16">
          {Object.entries(projectsByCategory).map(([categoryKey, projectKeys]) => (
            <div key={categoryKey}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">
                {categories[categoryKey as keyof typeof categories]}
              </h3>
              <div className="space-y-8">
                {projectKeys.map((key) => {
                  const project = items[key as keyof typeof items];
                  return (
                    <div
                      key={key}
                      className="border-l-2 border-neutral-200 pl-6 hover:border-neutral-900 transition-colors"
                    >
                      <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                        {project.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-neutral-600 mb-3">
                        <span>{project.client}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="font-medium">{project.role}</span>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
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
