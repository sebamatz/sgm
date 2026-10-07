import { MetadataRoute } from "next";
import { locales } from "./lib/translations";

const baseUrl = "https://www.sgmsoftware.gr";

const services = [
  "frontend",
  "custom",
  "consulting",
  "platforms",
  "enterprise",
  "modernization",
  "web-applications",
  "ai-automation",
  "enterprise-solutions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          el: `${baseUrl}/el`,
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
          en: `${baseUrl}/en/privacy`,
          el: `${baseUrl}/el/privacy`,
        },
      },
    });

    services.forEach((service) => {
      routes.push({
        url: `${baseUrl}/${locale}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/services/${service}`,
            el: `${baseUrl}/el/services/${service}`,
          },
        },
      });
    });
  });

  return routes;
}
