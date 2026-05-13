"use client";

import { DocumentationSidebar } from "@/features/documentation/components/documentation-sidebar";
import { ReactNode } from "react";

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_36%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.10),transparent_28%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[72px_72px] opacity-40" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-400 gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <DocumentationSidebar />
        {children}
      </div>
    </div>
  );
}
