import type { DocSection } from "../types/doc.types";

export const docSections: DocSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    slug: "introduction",
    order: 0,
  },
  {
    id: "core-rule",
    title: "Core Development Rule",
    slug: "core-rule",
    order: 1,
  },
  {
    id: "recommended-stack",
    title: "Recommended Stack",
    slug: "recommended-stack",
    order: 2,
  },
  {
    id: "root-structure",
    title: "Root Structure",
    slug: "root-structure",
    order: 3,
  },
  {
    id: "source-structure",
    title: "Source Structure",
    slug: "source-structure",
    order: 4,
  },
  {
    id: "app-router",
    title: "App Router Standard",
    slug: "app-router",
    order: 5,
  },
  {
    id: "layout",
    title: "Layout Standard",
    slug: "layout",
    order: 6,
  },
  {
    id: "components",
    title: "Components Standard",
    slug: "components",
    order: 7,
  },
  {
    id: "features",
    title: "Feature Folder Standard",
    slug: "features",
    order: 8,
  },
  {
    id: "generic-feature",
    title: "Generic Feature Structure",
    slug: "generic-feature",
    order: 9,
  },
  {
    id: "multi-resource",
    title: "Domain with Multiple Resources",
    slug: "multi-resource",
    order: 10,
  },
  {
    id: "auth-feature",
    title: "Auth Feature Pattern",
    slug: "auth-feature",
    order: 11,
  },
  {
    id: "api-layer",
    title: "API Layer Standard",
    slug: "api-layer",
    order: 12,
  },
  {
    id: "tanstack-query",
    title: "TanStack Query Standard",
    slug: "tanstack-query",
    order: 13,
  },
  {
    id: "url-state",
    title: "URL State Standard",
    slug: "url-state",
    order: 14,
  },
  {
    id: "list-table",
    title: "List and Table Pattern",
    slug: "list-table",
    order: 15,
  },
  {
    id: "forms",
    title: "Form Standard",
    slug: "forms",
    order: 16,
  },
  {
    id: "validation",
    title: "Validation Standard",
    slug: "validation",
    order: 17,
  },
  {
    id: "types",
    title: "Type Standard",
    slug: "types",
    order: 18,
  },
  {
    id: "providers",
    title: "Providers Standard",
    slug: "providers",
    order: 19,
  },
  {
    id: "hooks",
    title: "Hooks Standard",
    slug: "hooks",
    order: 20,
  },
  {
    id: "route-constants",
    title: "Route Constants Standard",
    slug: "route-constants",
    order: 21,
  },
  {
    id: "server-helpers",
    title: "Server Helpers Standard",
    slug: "server-helpers",
    order: 22,
  },
  {
    id: "auth-security",
    title: "Auth and Security Standard",
    slug: "auth-security",
    order: 23,
  },
  {
    id: "environment",
    title: "Environment Standard",
    slug: "environment",
    order: 24,
  },
  {
    id: "styling",
    title: "Styling Standard",
    slug: "styling",
    order: 25,
  },
  {
    id: "error-handling",
    title: "Error Handling Standard",
    slug: "error-handling",
    order: 26,
  },
  {
    id: "documentation",
    title: "Documentation Standard",
    slug: "documentation",
    order: 27,
  },
  {
    id: "naming",
    title: "Naming Rules",
    slug: "naming",
    order: 28,
  },
  {
    id: "imports",
    title: "Import Rules",
    slug: "imports",
    order: 29,
  },
  {
    id: "adding-page",
    title: "Adding a New Page",
    slug: "adding-page",
    order: 30,
  },
  {
    id: "adding-list",
    title: "Adding a New List/Table Feature",
    slug: "adding-list",
    order: 31,
  },
  {
    id: "adding-api",
    title: "Adding a New API Endpoint",
    slug: "adding-api",
    order: 32,
  },
  {
    id: "state-ownership",
    title: "State Ownership",
    slug: "state-ownership",
    order: 33,
  },
  {
    id: "files-avoid",
    title: "Files to Avoid Changing Casually",
    slug: "files-avoid",
    order: 34,
  },
  {
    id: "avoid-without-approval",
    title: "Do Not Add Without Approval",
    slug: "avoid-without-approval",
    order: 35,
  },
];

export const getSectionBySlug = (slug: string) => {
  return docSections.find((s) => s.slug === slug);
};
