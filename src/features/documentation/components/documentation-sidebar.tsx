"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { docSections } from "../data/sections";

export function DocumentationSidebar() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  return (
    <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-78 shrink-0 xl:block">
      <Card className="h-full rounded-[24px] p-6 backdrop-blur-xl">
        <CardHeader className="p-4 rounded-2xl bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-lg dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          <div className="flex flex-col items-start gap-2">
            <div>
              <CardTitle className="text-lg text-white">
                Next.js Stack
              </CardTitle>
              <CardDescription className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                standards for routes, features, data, and UI structure.
              </CardDescription>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/80 w-full text-center">
              36 chapters
            </div>
          </div>
        </CardHeader>

        <CardContent className="h-[calc(100%-11rem)] space-y-1 overflow-y-auto px-1">
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
        </CardContent>
      </Card>
    </aside>
  );
}
