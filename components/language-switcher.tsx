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
          variant="ghost"
          className={`text-neutral-600 hover:text-neutral-900 hover:bg-transparent p-2 transition-colors ${className}`}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white border border-neutral-200 min-w-[140px] p-1"
      >
        <DropdownMenuItem asChild disabled={currentLang === "en"}>
          <Link
            href="/en"
            className="flex items-center justify-between px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded cursor-pointer"
          >
            English
            {currentLang === "en" && (
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            )}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild disabled={currentLang === "el"}>
          <Link
            href="/el"
            className="flex items-center justify-between px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded cursor-pointer"
          >
            Ελληνικά
            {currentLang === "el" && (
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            )}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
