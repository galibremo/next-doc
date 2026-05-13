import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { DocumentationTOC } from "@/features/documentation/components/documentation-toc";
import { DocumentationSidebar } from "./components/documentation-sidebar";

interface DocumentationLayoutProps {
  children: ReactNode;
  content: string;
  title: string;
  description: string;
  sectionIndex: number;
}

export function DocumentationPage({
  children,
  content,
  title,
  description,
  sectionIndex,
}: DocumentationLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_36%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.10),transparent_28%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[72px_72px] opacity-40" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-450 gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <DocumentationSidebar />
        <main className="min-w-0 flex-1">
          <Card className="mb-6 rounded-[24px] backdrop-blur-xl">
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    <span className="rounded-full border border-border bg-muted/50 px-3 py-1 font-medium text-foreground/80">
                      Documentation
                    </span>
                    <span>{sectionIndex + 1} / 36</span>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                      {title}
                    </h1>
                    <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-start xl:justify-end gap-3 text-sm text-muted-foreground">
                  <div className="rounded-2xl border border-border bg-muted/40 px-4 py-3 shadow-sm">
                    Feature-based architecture
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/40 px-4 py-3 shadow-sm">
                    Consistent project structure
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/40 px-4 py-3 shadow-sm">
                    Static docs pages
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="min-w-0 flex-1 rounded-[24px] border border-border/70 bg-background/85 px-5 py-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.48)] backdrop-blur-xl sm:px-8 sm:py-8">
            <article className="prose prose-neutral max-w-none prose-headings:scroll-m-28 prose-headings:font-semibold prose-h1:mb-6 prose-h2:border-b prose-h2:border-border/80 prose-h2:pb-3 prose-p:leading-8 prose-a:font-medium prose-strong:text-foreground prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none dark:prose-invert">
              {children}
            </article>
          </div>
        </main>
        <DocumentationTOC content={content} />
      </div>
    </div>
  );
}
