"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { docSections } from "../data/sections";

interface DocumentationNavProps {
  currentSlug: string;
}

export function DocumentationNav({ currentSlug }: DocumentationNavProps) {
  const currentIndex = docSections.findIndex((s) => s.slug === currentSlug);
  const prevSection = currentIndex > 0 ? docSections[currentIndex - 1] : null;
  const nextSection =
    currentIndex < docSections.length - 1
      ? docSections[currentIndex + 1]
      : null;

  return (
    <div className="grid gap-6 border-t border-border/70 pt-8 md:grid-cols-2">
      {prevSection ? (
        <Link
          href={`/docs/${prevSection.slug}`}
          className="group rounded-[24px] border border-border/70 bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 rounded-xl border border-border bg-muted p-2 text-muted-foreground transition group-hover:bg-foreground group-hover:text-background">
              <ChevronLeft className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Previous
              </div>
              <div className="mt-1 text-base font-semibold leading-6">
                {prevSection.title}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextSection ? (
        <Link
          href={`/docs/${nextSection.slug}`}
          className="group rounded-[24px] border border-border/70 bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg md:text-right"
        >
          <div className="flex items-start gap-3 md:justify-end">
            <div className="order-2 md:order-1 md:text-right">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Next
              </div>
              <div className="mt-1 text-base font-semibold leading-6">
                {nextSection.title}
              </div>
            </div>
            <span className="order-1 mt-0.5 rounded-xl border border-border bg-muted p-2 text-muted-foreground transition group-hover:bg-foreground group-hover:text-background md:order-2">
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
