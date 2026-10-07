"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { contactConfig } from "@/app/lib/contact-config";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function Contact({
  lang,
  translations,
  id,
}: {
  lang: string;
  translations: any;
  id?: string;
}) {
  const t = translations;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;

    const loadTurnstile = () => {
      if (window.turnstile && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          callback: (token: string) => setTurnstileToken(token),
          "error-callback": () => {
            console.warn("Turnstile error");
            setTurnstileToken("");
          },
        });
      }
    };

    if (window.turnstile) {
      loadTurnstile();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = loadTurnstile;
      document.head.appendChild(script);
    }

    return () => {
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [turnstileSiteKey]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const payload = {
      name,
      email,
      message,
      honeypot,
      timestamp,
      ...(turnstileSiteKey && turnstileToken ? { botToken: turnstileToken } : {}),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        setHoneypot("");
        setTimestamp(Date.now());

        if (window.turnstile && turnstileWidgetId.current) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("API Error", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (setter: (value: string) => void) => (value: string) => {
    if (isSuccess) {
      setIsSuccess(false);
    }
    setter(value);
  };

  return (
    <section
      id={id || "contact"}
      className="relative py-20 md:py-32 bg-[#111a2e] border-t border-slate-800"
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="mb-12 md:mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            05 / contact
          </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
                {t.title}
              </h2>
            </div>

            {contactConfig.email && (
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-tech-cyan" />
                <span className="text-base font-mono">
                  {contactConfig.email}
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                <Input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  {t.name}
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => handleFieldChange(setName)(e.target.value)}
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-tech-cyan focus-visible:ring-1 focus-visible:ring-tech-cyan h-12"
                  required
                  disabled={isSubmitting}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  {t.email}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => handleFieldChange(setEmail)(e.target.value)}
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-tech-cyan focus-visible:ring-1 focus-visible:ring-tech-cyan h-12"
                  required
                  disabled={isSubmitting}
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  {t.message}
                </label>
                <Textarea
                  rows={6}
                  value={message}
                  onChange={(e) => handleFieldChange(setMessage)(e.target.value)}
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-tech-cyan focus-visible:ring-1 focus-visible:ring-tech-cyan resize-none"
                  required
                  disabled={isSubmitting}
                  maxLength={5000}
                />
              </div>

              {turnstileSiteKey && (
                <div ref={turnstileRef} className="flex justify-start" />
              )}

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-950/50 border border-red-800">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {isSuccess && (
                <div className="flex items-start gap-3 p-4 bg-green-950/50 border border-green-700/50">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-green-300 text-sm">{t.successMessage}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={
                  isSubmitting || !name || !email || !message
                }
                className="w-full h-12 text-sm font-mono font-medium uppercase tracking-wider transition-all shadow-lg bg-tech-blue hover:bg-tech-cyan text-white shadow-tech-blue/30 disabled:opacity-50"
              >
                {isSubmitting ? "SENDING..." : t.submit}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
