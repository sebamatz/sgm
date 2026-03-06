"use client";

import { motion } from "framer-motion";

// Update the interface to include the optional 'id'
export default function About({
  translations,
  id,
}: {
  translations: any;
  id?: string;
}) {
  const t = translations;

  // Const assertion ensures the array is treated as a BezierDefinition
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id={id || "about"}
      className="relative py-16 md:py-48 bg-black overflow-hidden flex justify-center border-t border-white/5"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 md:mb-20"
        >
          <span className="text-xs font-black tracking-[0.3em] text-zinc-500 uppercase flex items-center gap-4">
            <span className="w-8 h-[1px] bg-zinc-500" />
            {t.title}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="lg:col-span-5"
          >
            <h3 className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-[-0.03em] text-white leading-[1.05]">
              {t.subtitle}
            </h3>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col space-y-8 md:space-y-10 lg:mt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-medium leading-relaxed tracking-tight"
            >
              {t.description1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
              className="text-lg md:text-xl text-zinc-500 font-normal leading-relaxed"
            >
              {t.description2}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
