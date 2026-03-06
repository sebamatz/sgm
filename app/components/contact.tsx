"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "../hooks/use-language";
import { translations } from "../lib/translations";
import { ArrowUpRight, Mail, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  // 🛠️ DISTINCT HOOKS: Fully controlled component state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 🛠️ UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const premiumEase = [0.16, 1, 0.3, 1] as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using the strictly controlled state values
    const payload = { name, email, message };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        // 🛠️ Clear the state explicitly
        setName("");
        setEmail("");
        setMessage("");

        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error("Failed to send");
      }
    } catch (error) {
      console.error("API Error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-48 bg-black overflow-hidden flex justify-center border-t border-white/5"
    >
      <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 -left-24 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div className="flex flex-col space-y-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
            >
              <h2
                lang={language}
                className="text-[13vw] sm:text-[10vw] md:text-[7rem] lg:text-[7rem] xl:text-[8.5rem] font-black tracking-[-0.05em] leading-[0.9] text-white capitalize break-words hyphens-auto"
              >
                {t.title.split(" ").map((word: string, i: number) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h2>
              <div className="mt-12 flex flex-col gap-6">
                <div className="flex items-center gap-4 text-zinc-500 hover:text-white transition-all duration-500 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                    <Mail className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <span className="text-xl font-medium text-white">
                    hello@sgmsoftware.com
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:col-span-5 lg:pl-8 pt-4"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="group relative">
                <label className="block text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-blue-500 transition-colors duration-300 mb-4">
                  {t.name}
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  /* 🛠️ INJECTED text-white to fix the invisible typing */
                  className="rounded-none border-x-0 border-t-0 border-b border-white/10 bg-transparent p-2 text-white text-xl md:text-2xl focus-visible:ring-0 focus-visible:border-blue-500 transition-all duration-500 h-14"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="group relative">
                <label className="block text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-blue-500 transition-colors duration-300 mb-4">
                  {t.email}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  /* 🛠️ INJECTED text-white here too */
                  className="rounded-none border-x-0 border-t-0 border-b border-white/10 bg-transparent p-2 text-white text-xl md:text-2xl focus-visible:ring-0 focus-visible:border-blue-500 transition-all duration-500 h-14"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="group relative">
                <label className="block text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-blue-500 transition-colors duration-300 mb-4">
                  {t.message}
                </label>
                <Textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  /* 🛠️ INJECTED text-white and corrected formatting */
                  className="rounded-none border-x-0 border-t-0 border-b border-white/10 bg-transparent p-2 text-white text-xl md:text-2xl focus-visible:ring-0 focus-visible:border-blue-500 transition-all duration-500 resize-none overflow-hidden"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting || isSuccess || !name || !email || !message
                }
                className={`group relative w-full h-20 overflow-hidden transition-all duration-500 flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.3em] ${
                  isSuccess
                    ? "bg-green-500 text-white"
                    : "bg-white hover:bg-zinc-200 text-black"
                } disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <span className="relative z-10 animate-pulse">
                    SENDING...
                  </span>
                ) : isSuccess ? (
                  <span className="relative z-10 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> SENT
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">{t.submit}</span>
                    <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                    <span className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity duration-300 pointer-events-none">
                      {t.submit}{" "}
                      <ArrowUpRight className="ml-4 w-5 h-5 rotate-45" />
                    </span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
