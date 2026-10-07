"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { updateConsent } from "../../lib/analytics";

interface CookieConsentProps {
  lang: string;
  translations: {
    message: string;
    accept: string;
    reject: string;
    learnMore: string;
  };
}

export default function CookieConsent({ lang, translations }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only show if tracking is configured and no consent decision exists
    const hasTracking = !!(
      process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ||
      process.env.NEXT_PUBLIC_GA4_ID
    );

    if (!hasTracking) {
      return;
    }

    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    updateConsent("granted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    updateConsent("denied");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-[#111] border border-[#262626] rounded-lg shadow-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              {translations.message}{" "}
              <Link
                href={`/${lang}/privacy`}
                className="text-tech-cyan hover:text-tech-blue transition-colors underline"
              >
                {translations.learnMore}
              </Link>
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-tech-blue hover:bg-tech-cyan text-white text-sm font-medium rounded transition-colors"
              >
                {translations.accept}
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-2 bg-transparent border border-neutral-600 text-neutral-300 hover:text-white hover:border-neutral-400 text-sm font-medium rounded transition-colors"
              >
                {translations.reject}
              </button>
            </div>
          </div>

          <button
            onClick={handleReject}
            className="flex-shrink-0 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
