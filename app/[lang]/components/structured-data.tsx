export default function StructuredData({ lang }: { lang: string }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SGM Software Developers",
    url: "https://www.sgmsoftware.gr",
    logo: "https://www.sgmsoftware.gr/icon.svg",
    description:
      lang === "el"
        ? "Επαγγελματική ανάπτυξη προσαρμοσμένων εφαρμογών και αυτοματισμών με τεχνητή νοημοσύνη στην Ελλάδα και την Ευρώπη. Διαδικτυακές εφαρμογές, αυτοματοποίηση διαδικασιών, εταιρικές λύσεις και τεχνική καθοδήγηση. Περισσότερα από 10 χρόνια εμπειρίας με φορείς της ΕΕ και εταιρικούς πελάτες."
        : "Professional custom software development and AI automation in Greece and Europe. Web applications, workflow automation, enterprise solutions and technical guidance. More than 10 years of experience delivering for EU institutions and enterprise clients.",
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
      "Custom Software Development",
      "Web Application Development",
      "Technical Consulting",
      "AI Automation",
      "AI Agent Development",
      "Workflow Automation",
      "Enterprise Solutions",
    ],
    founder: {
      "@type": "Person",
      name: "Sevastos Matzouranis",
      jobTitle: "Senior Software Engineer",
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
