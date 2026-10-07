export default function StructuredData({ lang }: { lang: string }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SGM Software Developers",
    url: "https://www.sgmsoftware.gr",
    logo: "https://www.sgmsoftware.gr/icon.svg",
    description:
      lang === "el"
        ? "Επαγγελματική ανάπτυξη custom εφαρμογών και AI automation στην Ελλάδα και Ευρώπη. Web εφαρμογές, React/Next.js development, frontend αρχιτεκτονική, AI agents."
        : "Professional custom software development and AI automation in Greece and Europe. Web applications, React/Next.js development, frontend architecture, AI agents.",
    areaServed: [
      {
        "@type": "Country",
        name: "Greece",
      },
      {
        "@type": "Place",
        name: "Europe",
      },
    ],
    serviceType: [
      "Frontend Development",
      "Custom Software Development",
      "Web Application Development",
      "React Development",
      "Next.js Development",
      "TypeScript Development",
      "Technical Consulting",
      "AI Automation",
      "AI Agent Development",
      "Workflow Automation",
    ],
    founder: {
      "@type": "Person",
      name: "Sevastos Matzouranis",
      jobTitle: "Senior Frontend Engineer & Team Leader",
      sameAs: [
        "https://www.linkedin.com/in/sevastos-matzouranis/",
        "https://github.com/sebamatz",
      ],
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "el" ? "Αρχική" : "Home",
        item: `https://www.sgmsoftware.gr/${lang}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb),
        }}
      />
    </>
  );
}
