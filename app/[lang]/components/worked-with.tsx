"use client";

export default function WorkedWith({ translations }: { translations: any }) {
  const t = translations;

  return (
    <section className="relative py-12 md:py-16 bg-black border-y border-neutral-800">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 text-center mb-8">
          {t.title}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
          {t.organizations.map((org: { name: string; subtitle: string }, index: number) => (
            <div
              key={index}
              className="group text-center"
            >
              <div className="text-sm md:text-base font-medium text-neutral-400 group-hover:text-tech-cyan transition-colors duration-300">
                {org.name}
              </div>
              {org.subtitle && (
                <div className="text-xs font-mono text-neutral-600 mt-1">
                  {org.subtitle}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
