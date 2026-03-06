import type { Metadata } from "next";
import { translations } from "../lib/translations";
import React, { ReactNode } from "react";
import SmoothScroll from "../../components/SmoothScroll";

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      {/* CSS Preload Killer */}
      <span className="sr-only opacity-0 invisible" aria-hidden="true" />

      {/* Main App Wrapper */}
      <div className="min-h-screen bg-[#050505] text-foreground antialiased selection:bg-white selection:text-black overflow-x-hidden">
        <SmoothScroll>{children as any}</SmoothScroll>
      </div>
    </>
  );
}
