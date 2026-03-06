"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({
  currentLang,
  className = "",
}: {
  currentLang: string;
  className?: string;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          /* 🛠️ Force variant="ghost" to prevent default blue background */
          variant="ghost"
          className={`text-white rounded-full p-0 hover:bg-transparent hover:text-white transition-colors ${className}`}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        /* Added z-[60] to stay above the header */
        className="bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/10 rounded-2xl min-w-[140px] p-1.5 mt-2 z-[60] shadow-2xl"
      >
        <DropdownMenuItem asChild disabled={currentLang === "en"}>
          <Link
            href="/en"
            /* 🛠️ OVERRIDE: focus:bg-white/5 and data-[highlighted] kill the Radix blue highlight */
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white data-[highlighted]:bg-white/5 data-[highlighted]:text-white rounded-xl transition-all cursor-pointer outline-none border-none ring-0"
          >
            English
            {currentLang === "en" && (
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            )}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild disabled={currentLang === "el"}>
          <Link
            href="/el"
            /* 🛠️ SAME FIX HERE: Killing the accent background */
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white data-[highlighted]:bg-white/5 data-[highlighted]:text-white rounded-xl transition-all cursor-pointer outline-none border-none ring-0"
          >
            Ελληνικά
            {currentLang === "el" && (
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            )}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
