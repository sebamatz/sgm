import { MetadataRoute } from "next";
import { locales } from "./lib/translations";

// Domain-specific base URLs
const grBase = "https://www.sgmsoftware.gr";
const comBase = "https://www.sgmsoftware.com";

const services = [
  "frontend",
  "custom",
  "consulting",
  "platforms",
  "enterprise",
  "modernization",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    const baseUrl = locale === "el" ? grBase : comBase;
    const alternateEn = comBase;
    const alternateEl = grBase;

    // Home page
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${alternateEn}/en`,
          el: `${alternateEl}/el`,
        },
      },
    });

    // Privacy page
    routes.push({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${alternateEn}/en/privacy`,
          el: `${alternateEl}/el/privacy`,
        },
      },
    });

    // Service pages
    services.forEach((service) => {
      routes.push({
        url: `${baseUrl}/${locale}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${alternateEn}/en/services/${service}`,
            el: `${alternateEl}/el/services/${service}`,
          },
        },
      });
    });
  });

  return routes;
}
