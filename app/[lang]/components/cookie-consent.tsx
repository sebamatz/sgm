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
    close: string;
  };
}

export default function CookieConsent({ lang, translations }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
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
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-lg shadow-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-sm text-ink leading-relaxed mb-4">
              {translations.message}{" "}
              <Link
                href={`/${lang}/privacy`}
                className="text-tech-blue hover:text-tech-cyan transition-colors underline"
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
                className="px-6 py-2 bg-transparent border border-slate-300 text-ink-light hover:text-ink hover:border-slate-400 text-sm font-medium rounded transition-colors"
              >
                {translations.reject}
              </button>
            </div>
          </div>

          <button
            onClick={handleReject}
            className="flex-shrink-0 text-ink-light hover:text-ink transition-colors"
            aria-label={translations.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
