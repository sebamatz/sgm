"use client";

export default function About({
  translations,
  id,
}: {
  translations: any;
  id?: string;
}) {
  const t = translations;

  return (
    <section
      id={id || "about"}
      className="relative py-20 md:py-32 bg-white"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-light mb-4">
            03 / about
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink leading-tight">
              {t.subtitle}
            </h3>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-ink leading-relaxed">
                {t.description1}
              </p>

              <p className="text-base text-ink-light leading-relaxed">
                {t.description2}
              </p>
            </div>

            {t.techTitle && (
              <div className="p-6 border border-slate-200 bg-slate-50">
                <h4 className="text-xs font-mono uppercase tracking-wider text-ink mb-4">
                  {t.techTitle}
                </h4>
                <p className="text-base text-ink-light leading-relaxed">
                  {t.techDescription}
                </p>
              </div>
            )}

            {t.educationTitle && (
              <div className="p-6 border border-slate-200 bg-slate-50">
                <h4 className="text-xs font-mono uppercase tracking-wider text-ink mb-4">
                  {t.educationTitle}
                </h4>
                <p className="text-base text-ink-light leading-relaxed">
                  {t.educationDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
