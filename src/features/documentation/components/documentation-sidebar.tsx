"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { docSections } from "../data/sections";

export function DocumentationSidebar() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  return (
    <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[19rem] shrink-0 overflow-hidden rounded-[28px] border border-border/70 bg-background/85 p-4 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.5)] backdrop-blur-xl lg:block">
      <div className="mb-4 rounded-[24px] border border-border/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 text-white shadow-lg dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/65">
              Docs shell
            </p>
            <h2 className="mt-2 text-lg font-semibold">Next.js Stack</h2>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/80">
            36 chapters
          </div>
        </div>
        <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
          Opinionated standards for routes, features, data, and UI structure.
        </p>
      </div>

      <nav className="h-[calc(100%-11rem)] space-y-1 overflow-y-auto pr-1">
        {docSections.map((section) => (
          <Link
            key={section.id}
            href={`/docs/${section.slug}`}
            className={cn(
              "flex items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-sm transition-all duration-200",
              currentSlug === section.slug
                ? "border-border bg-foreground text-background shadow-sm"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <span className="line-clamp-2">{section.title}</span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em]",
                currentSlug === section.slug
                  ? "border-background/20 bg-background/10 text-background"
                  : "border-border bg-background text-muted-foreground",
              )}
            >
              {String(section.order + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
