import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { DocumentationLayout } from "@/features/documentation/components/documentation-layout";
import { DocumentationNav } from "@/features/documentation/components/documentation-nav";
import { MarkdownRenderer } from "@/features/documentation/components/markdown-renderer";
import { getContentBySlug } from "@/features/documentation/data/content";
import {
  docSections,
  getSectionBySlug,
} from "@/features/documentation/data/sections";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = getSectionBySlug(slug);

  if (!section) {
    return {
      title: "Not Found",
      description: "Documentation page not found",
    };
  }

  return {
    title: `${section.title} | Next.js Stack Documentation`,
    description: `Learn about ${section.title} in the Next.js Stack Developer Documentation.`,
  };
}

export function generateStaticParams() {
  return docSections.map((section) => ({
    slug: section.slug,
  }));
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const section = getSectionBySlug(slug);
  const content = getContentBySlug(slug);

  if (!section || !content) {
    notFound();
  }

  return (
    <DocumentationLayout
      content={content}
      title={section.title}
      description={
        slug === "introduction"
          ? "Start here for a high-level overview of the documentation system and how the standard is organized."
          : `Practical guidance for ${section.title.toLowerCase()} and the surrounding implementation patterns.`
      }
      sectionIndex={section.order}
    >
      <MarkdownRenderer content={content} />
      <DocumentationNav currentSlug={slug} />
    </DocumentationLayout>
  );
}
