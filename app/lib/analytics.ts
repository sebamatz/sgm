"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function GoogleAnalytics() {
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    if (!googleAdsId && !ga4Id) {
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };

    // Set default consent to denied (Google Consent Mode v2)
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
      wait_for_update: 500,
    });

    // Load Google Ads script if configured
    if (googleAdsId) {
      const adsScript = document.createElement("script");
      adsScript.async = true;
      adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`;
      document.head.appendChild(adsScript);

      adsScript.onload = () => {
        window.gtag!("js", new Date());
        window.gtag!("config", googleAdsId);
      };
    }

    // Load GA4 script if configured
    if (ga4Id) {
      if (!googleAdsId) {
        // Only load gtag script if not already loaded by Ads
        const ga4Script = document.createElement("script");
        ga4Script.async = true;
        ga4Script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
        document.head.appendChild(ga4Script);

        ga4Script.onload = () => {
          window.gtag!("js", new Date());
          window.gtag!("config", ga4Id);
        };
      } else {
        // gtag already loaded, just configure GA4
        window.gtag!("config", ga4Id);
      }
    }

    // Check for existing consent
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      updateConsent("granted");
    }
  }, [googleAdsId, ga4Id]);

  return null;
}

export function updateConsent(value: "granted" | "denied") {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
    functionality_storage: value,
    personalization_storage: value,
  });
}

export function trackConversion() {
  if (typeof window === "undefined" || !window.gtag) return;

  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  // Fire Google Ads conversion
  if (googleAdsId && conversionLabel) {
    window.gtag("event", "conversion", {
      send_to: `${googleAdsId}/${conversionLabel}`,
    });
  }

  // Fire GA4 generate_lead event
  if (ga4Id) {
    window.gtag("event", "generate_lead", {
      send_to: ga4Id,
    });
  }
}
