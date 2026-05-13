"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface DocumentationTOCProps {
  content: string;
}

export function DocumentationTOC({ content }: DocumentationTOCProps) {
  const [items, setItems] = useState<TableOfContentsItem[]>([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const headings = content.match(/^#+\s+.+$/gm) || [];
    const tocItems = headings.map((heading) => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const text = heading.replace(/^#+\s+/, "");
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      return { id, text, level };
    });

    setItems(tocItems);
  }, [content]);

  if (items.length === 0) return null;

  return (
    <aside className="w-64 shrink-0">
      <Card className="backdrop-blur-xl">
        <CardContent className="space-y-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background px-3 py-2.5 text-left text-sm font-semibold shadow-sm transition hover:bg-muted"
          >
            <span>On this page</span>
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expanded && (
            <nav className="space-y-1.5 rounded-2xl border border-border/60 bg-background p-3 text-sm shadow-sm">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "block rounded-xl py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    item.level === 2 && "pl-0 font-medium text-foreground",
                    item.level === 3 && "pl-4",
                    item.level >= 4 && "pl-8",
                  )}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}
