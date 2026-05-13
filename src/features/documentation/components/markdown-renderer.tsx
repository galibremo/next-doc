"use client";

import { ReactNode } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const toText = (node: ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node);
    }

    if (Array.isArray(node)) {
      return node.map(toText).join("");
    }

    if (node && typeof node === "object" && "props" in node) {
      return toText(
        (node as { props?: { children?: ReactNode } }).props?.children,
      );
    }

    return "";
  };

  const createHeading =
    (level: 1 | 2 | 3 | 4 | 5 | 6) =>
    ({ children, ...props }: any) => {
      const text = toText(children);
      const id = text
        .toLowerCase()
        .trim()
        .replace(/["']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const classNameByLevel = {
        1: "mt-0 mb-5 text-4xl font-semibold tracking-tight text-balance",
        2: "mt-12 mb-5 border-b border-border/80 pb-3 text-2xl font-semibold tracking-tight text-balance",
        3: "mt-10 mb-3 text-xl font-semibold tracking-tight",
        4: "mt-8 mb-2 text-lg font-semibold tracking-tight",
        5: "mt-6 mb-2 text-base font-semibold tracking-tight",
        6: "mt-5 mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground",
      } as const;

      const HeadingTag = `h${level}` as const;

      return (
        <HeadingTag
          id={id}
          className={`${classNameByLevel[level]} scroll-m-28 group`}
          {...props}
        >
          <a href={`#${id}`} className="group-hover:text-foreground/90">
            {children}
          </a>
        </HeadingTag>
      );
    };

  const components: any = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: ({ children, ...props }: any) => (
      <p
        className="text-[15px] leading-8 text-foreground/90 [&:not(:first-child)]:mt-6 mb-4"
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul
        className="my-6 ml-6 list-disc space-y-2 text-[15px] leading-7"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol
        className="my-6 ml-6 list-decimal space-y-2 text-[15px] leading-7"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="mt-2 marker:text-muted-foreground" {...props}>
        {children}
      </li>
    ),
    a: ({ href, children, ...props }: any) => (
      <a
        href={href}
        className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary/70"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="my-6 rounded-2xl border border-border/70 bg-muted/35 px-5 py-4 text-muted-foreground shadow-sm"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "text";
      const isInline = !className;

      if (isInline) {
        return (
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {children}
          </code>
        );
      }

      return (
        <div className="my-6 overflow-hidden rounded-2xl border border-border/70 bg-[#0b1220] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.65)]">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{
              padding: "1.15rem 1.2rem",
              margin: 0,
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    },
    table: ({ children, ...props }: any) => (
      <div className="my-6 overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
        <table className="w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead
        className="border-b border-border/70 bg-muted/70 text-sm uppercase tracking-[0.16em] text-muted-foreground"
        {...props}
      >
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: any) => (
      <tbody className="divide-y divide-border/70" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: any) => (
      <tr className="even:bg-muted/30" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: any) => (
      <th
        className="px-4 py-4 text-left font-semibold text-foreground"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="px-4 py-4 text-sm text-foreground/90" {...props}>
        {children}
      </td>
    ),
    hr: (props: any) => <hr className="my-8 border-border" {...props} />,
  };

  return <Markdown components={components}>{content}</Markdown>;
}
