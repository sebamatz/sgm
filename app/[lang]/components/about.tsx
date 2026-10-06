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
      className="relative py-20 md:py-32 bg-neutral-50 border-t border-neutral-200"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-4">
            {t.title}
          </p>
          <div className="w-16 h-px bg-neutral-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
              {t.subtitle}
            </h3>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                {t.description1}
              </p>

              <p className="text-base text-neutral-600 leading-relaxed">
                {t.description2}
              </p>
            </div>

            {t.techTitle && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                  {t.techTitle}
                </h4>
                <p className="text-base text-neutral-700 leading-relaxed">
                  {t.techDescription}
                </p>
              </div>
            )}

            {t.educationTitle && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                  {t.educationTitle}
                </h4>
                <p className="text-base text-neutral-700 leading-relaxed">
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
