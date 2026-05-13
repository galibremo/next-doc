export const docContent: Record<string, string> = {
  introduction: `# Next.js Stack Developer Documentation

## Purpose

This document defines a reusable development standard for building and maintaining Next.js projects that follow a feature-based architecture.

It is intended for all kinds of Next.js projects, not just one specific product or dashboard. Use it during project setup, feature development, onboarding, code review, refactoring, and long-term maintenance.

The core goal is consistency. Every new route, feature, API hook, form, table, shared component, and utility should have a clear owner and predictable location.`,

  "core-rule": `# Core Development Rule

\`\`\`text
Routes stay thin.
Feature folders own domain behavior.
Shared components stay reusable.
API state belongs to TanStack Query.
URL state belongs to nuqs.
Forms use React Hook Form and Zod.
Backend business rules remain authoritative.
\`\`\`

Do not design each feature with a different structure. Pick the closest existing pattern in the project and extend it.

If a project does not yet have an existing pattern, start with the generic structure in this document.`,

  "recommended-stack": `# Recommended Stack

| Area | Standard |
| --- | --- |
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI primitives | shadcn/ui |
| API/server state | TanStack Query |
| URL state | nuqs |
| Forms | React Hook Form |
| Validation | Zod |
| HTTP client | Shared API client under \`src/lib/api\` |
| Auth/session support | Global auth provider and server helpers |
| Routing constants | \`src/routes/routes.ts\` |
| Package manager | pnpm |

## Architectural Intent

The stack separates responsibilities clearly:

- \`src/app\` owns routing and layout composition.
- \`src/features\` owns business/domain behavior.
- \`src/components\` owns reusable UI.
- \`src/lib\` owns shared clients and utilities.
- \`src/providers\` owns app-wide providers.
- \`src/routes\` owns route constants.
- \`src/server\` owns server-only helpers.
- \`src/validators\` owns reusable validation rules.
- \`src/hooks\` owns reusable cross-feature hooks.
- \`src/core\` owns app-level constants, environment helpers, and generic messages.

This prevents route files, shared UI, and global utilities from becoming dumping grounds.`,

  "root-structure": `# Root Structure

\`\`\`text
.
|-- .github/
|-- .vscode/
|-- @types/
|-- docs/
|   |-- memory/
|   \`-- plan/
|-- public/
|-- src/
|   |-- app/
|   |-- components/
|   |-- core/
|   |-- features/
|   |-- hooks/
|   |-- lib/
|   |-- providers/
|   |-- routes/
|   |-- server/
|   \`-- validators/
|-- README.md
|-- components.json
|-- eslint.config.mjs
|-- next.config.ts
|-- package.json
|-- pnpm-lock.yaml
|-- postcss.config.mjs
\`\`\`

A project may have extra files depending on tooling, deployment, AI assistance, testing, CI, or monorepo needs. Extra files are allowed, but they should not weaken the core ownership model.

## Root File Ownership

| Path | Purpose | Edit rule |
| --- | --- | --- |
| \`README.md\` | Main developer documentation for the repository | Update when setup, architecture, routes, or workflows change |
| \`package.json\` | Scripts and dependencies | Edit only for real script/dependency changes |
| \`pnpm-lock.yaml\` | Dependency lockfile | Do not edit manually |
| \`next.config.ts\` | Next.js configuration | Keep small and deliberate |
| \`tsconfig.json\` | TypeScript configuration and \`@/*\` alias | Avoid casual changes |
| \`eslint.config.mjs\` | ESLint configuration | Change deliberately and consistently |
| \`.prettierrc\` | Formatting and import order | Change only with team agreement |
| \`components.json\` | shadcn/ui configuration | Update only when shadcn setup changes |
| \`postcss.config.mjs\` | Tailwind PostCSS setup | Rarely edit |
| \`docs/*\` | Plans, standards, and durable decisions | Keep updated when conventions change |
| \`.github/*\` | Workflows, instructions, or automation | Edit only for CI, workflow, or team automation changes |`,

  "source-structure": `# Source Structure

\`\`\`text
src/
|-- app/
|-- components/
|   |-- common/
|   |-- layout/
|   \`-- ui/
|-- core/
|-- features/
|-- hooks/
|-- lib/
|   \`-- api/
|-- providers/
|-- routes/
|-- server/
\`-- validators/
\`\`\`

## Folder Ownership

| Folder | Owns | Must not own |
| --- | --- | --- |
| \`src/app\` | Route hierarchy, layouts, metadata, route-level composition | Feature business logic, table state, complex forms, API clients |
| \`src/components/ui\` | shadcn/ui primitives | Domain-specific behavior |
| \`src/components/common\` | Reusable product components | Feature-specific rules |
| \`src/components/layout\` | App shell, dashboard shell, navigation, headers | Feature-specific data fetching |
| \`src/features\` | Domain modules | Global framework configuration |
| \`src/hooks\` | Reusable cross-feature hooks | Domain-heavy behavior that belongs in a feature |
| \`src/lib\` | Shared clients and utilities | UI behavior and toasts |
| \`src/lib/api\` | API client, API errors, QueryClient setup | Feature endpoint definitions |
| \`src/providers\` | App-wide React providers | Feature-specific context |
| \`src/routes\` | Frontend and backend route constants | UI rendering |
| \`src/server\` | Server-only helpers | Browser-only code |
| \`src/validators\` | Shared validation helpers | Feature-specific schemas |
| \`src/core\` | Env helpers, generic constants, app messages | Feature-specific code |`,

  "app-router": `# App Router Standard

Use \`src/app\`, not a root-level \`app\` directory.

A common structure looks like this:

\`\`\`text
src/app/
|-- layout.tsx
|-- globals.css
|-- not-found.tsx
|-- favicon.ico
|-- (auth)/
|   \`-- login/
|       \`-- page.tsx
\`-- (main)/
    |-- layout.tsx
\`\`\`

Route groups should describe layout or access boundaries, not business domains by default.

Examples:

| Route group | Use case |
| --- | --- |
| \`(auth)\` | Login, register, forgot password, reset password |
| \`(main)\` | Main authenticated app |
| \`(dashboard)\` | Dashboard shell projects |
| \`(marketing)\` | Public marketing pages |
| \`(admin)\` | Admin-only layout area if it has a distinct shell |

## Route File Rules

Route files should be thin and predictable.

A route file may:

- Define metadata.
- Read route params.
- Read search params only when necessary for server behavior.
- Render one feature-level page component.
- Do lightweight server-only metadata loading when needed.

A route file must not:

- Define table columns.
- Define Zod schemas.
- Own filters, pagination, sorting, or modal state.
- Call client API functions directly.
- Contain large UI implementations.
- Own domain-specific business workflows.

## Standard Route File Example

\`\`\`tsx
import type { Metadata } from "next";

import { FeaturePage } from "@/features/example/components/feature-page";

export const metadata: Metadata = {
	title: "Feature",
	description: "Short page description."
};

export default function Page() {
	return <FeaturePage />;
}
\`\`\`

## Dynamic Route Example

\`\`\`tsx
import type { Metadata } from "next";

import { ResourceDetailsPage } from "@/features/resources/components/resource-details-page";

type PageProps = {
	params: Promise<{ resourceId: string }>;
};

export const metadata: Metadata = {
	title: "Resource Details",
	description: "View resource details."
};

export default async function Page({ params }: PageProps) {
	const { resourceId } = await params;
	return <ResourceDetailsPage resourceId={resourceId} />;
}
\`\`\``,

  layout: `# Layout Standard

## Layout Files

| File | Responsibility |
| --- | --- |
| \`src/app/layout.tsx\` | Root layout, fonts, global providers, global toaster, global adapters |
| \`src/app/(main)/layout.tsx\` | Main app shell, sidebar/header, app-level layout structure |
| \`src/app/(auth)/layout.tsx\` | Optional auth-specific layout |
| \`src/app/not-found.tsx\` | Global 404 page |
| \`src/app/globals.css\` | Tailwind, shadcn theme tokens, global CSS variables |

## Layout Rules

- Add global providers in \`src/app/layout.tsx\` only when the entire app truly needs them.
- Keep shell concerns in layout files and \`src/components/layout\`.
- Do not add feature-specific providers to global layout.
- Do not fetch feature-specific data in app shell layout unless it is genuinely required by the shell.
- Keep layout components stable and reusable.`,

  components: `# Components Standard

## Components Structure

\`\`\`text
src/components/
|-- common/
|   |-- table/
|   |-- empty-state.tsx
|   |-- error-alert.tsx
|   \`-- page-header.tsx
|-- layout/
|   |-- app-sidebar.tsx
|   |-- app-header.tsx
|   \`-- main-shell.tsx
\`-- ui/
    |-- button.tsx
    |-- card.tsx
    |-- dialog.tsx
    |-- dropdown-menu.tsx
    |-- input.tsx
    |-- label.tsx
    \`-- tooltip.tsx
\`\`\`

Exact files will vary by project. The ownership rule matters more than the exact list.

## Component Ownership

| Need | Location |
| --- | --- |
| shadcn primitive | \`src/components/ui\` |
| reusable product component | \`src/components/common\` |
| reusable table behavior | \`src/components/common/table\` |
| app layout/header/sidebar | \`src/components/layout\` |
| domain-specific UI | \`src/features/<feature>/components\` |
| feature-specific shared UI | \`src/features/<domain>/shared/components\` |

## Component Rules

- Use \`src/components/ui\` for low-level shadcn primitives.
- Keep \`src/components/ui\` close to shadcn patterns.
- Put reusable product components in \`src/components/common\`.
- Put app shell components in \`src/components/layout\`.
- Put domain-specific UI in \`src/features/<feature>/components\`.
- Do not put feature-specific API calls or permissions into shared UI primitives.
- Add shared UI only if two or more features need it.
- Do not create a second UI primitive system.`,

  features: `# Feature Folder Standard

Feature code lives under \`src/features\`.

A project may have features such as:

\`\`\`text
src/features/
|-- auth/
|-- users/
|-- teams/
|-- billing/
|-- reports/
|-- settings/
|-- notifications/
|-- products/
|-- orders/
\`-- inventory/
\`\`\`

Use feature names that match the business domain of the project.

A feature should own its own:

- API calls.
- Query hooks.
- Mutation hooks.
- Query keys.
- Components.
- Forms.
- Schemas.
- Types.
- Context providers.
- Feature-specific utilities.

Feature logic should not leak into route files, global components, or global utility folders.`,

  "generic-feature": `# Generic Feature Structure

Use this structure for most standalone features:

\`\`\`text
src/features/<feature>/
|-- api/
|   |-- <feature>.api.ts
|   |-- <feature>.keys.ts
|   |-- <feature>.queries.ts
|   \`-- <feature>.mutations.ts
|-- components/
|   |-- <feature>-page.tsx
|   |-- <feature>-table.tsx
|   \`-- <feature>-data-table-toolbar.tsx
|-- context/
|   \`-- <feature>-list-context.tsx
|-- forms/
|   \`-- <feature-singular>-form.tsx
|-- schemas/
|   \`-- <feature-singular>.schema.ts
|-- types/
|   \`-- <feature-singular>.types.ts
\`-- utils/
    |-- <feature>-errors.ts
    \`-- <feature>-format.ts
\`\`\`

For small features, some folders may not be needed. Do not create empty folders.

For large domains, split by resource.`,

  "multi-resource": `# Domain with Multiple Resources Pattern

Some projects have large domains that contain multiple related resources.

Examples:

| Domain | Possible resources |
| --- | --- |
| Commerce | products, orders, customers, coupons, shipments |
| SaaS admin | users, teams, roles, audit logs, billing |
| Project management | projects, tasks, milestones, comments, files |
| Learning platform | courses, lessons, quizzes, enrollments, certificates |
| CRM | contacts, companies, deals, activities, pipelines |
| Healthcare app | patients, appointments, providers, prescriptions |
| Marketplace | listings, sellers, buyers, payments, disputes |

Use this structure:

\`\`\`text
src/features/<domain>/
|-- <resource-a>/
|   |-- api/
|   |-- components/
|   |-- context/
|   |-- forms/
|   |-- schemas/
|   |-- types/
|   \`-- utils/
|-- <resource-b>/
|   |-- api/
|   |-- components/
|   |-- context/
|   |-- forms/
|   |-- schemas/
|   |-- types/
|   \`-- utils/
|-- references/
|   |-- api/
|   |-- components/
|   \`-- types/
\`-- shared/
    |-- components/
    |-- types/
    \`-- utils/
\`\`\`

## Resource Pattern

\`\`\`text
src/features/<domain>/<resource>/
|-- api/
|   |-- <resource>.api.ts
|   |-- <resource>.keys.ts
|   |-- <resource>.mutations.ts
|   \`-- <resource>.queries.ts
|-- components/
|   |-- <resource>-page.tsx
|   |-- <resource>-table.tsx
|   \`-- <resource>-data-table-toolbar.tsx
|-- context/
|   \`-- <resource>-list-context.tsx
|-- forms/
|   \`-- <resource-singular>-form.tsx
|-- schemas/
|   \`-- <resource-singular>.schema.ts
|-- types/
|   \`-- <resource-singular>.types.ts
\`-- utils/
    |-- <resource>-errors.ts
    \`-- <resource>-format.ts
\`\`\`

## Domain Shared

Use \`src/features/<domain>/shared\` only for code shared by multiple resources inside that domain.

Examples:

\`\`\`text
src/features/commerce/shared/
|-- components/
|   |-- commerce-status-badge.tsx
|   \`-- money-display.tsx
|-- types/
|   \`-- commerce.types.ts
\`-- utils/
    |-- commerce-errors.ts
    \`-- commerce-format.ts
\`\`\`

Do not move unrelated global utilities into a domain shared folder.

## References Pattern

Use \`references\` for reusable dropdown/reference data inside a domain.

Examples:

- Users for assignment dropdowns.
- Teams for ownership filters.
- Categories for product forms.
- Statuses for workflow filters.
- Regions or locations for selectors.

\`\`\`text
src/features/<domain>/references/
|-- api/
|   |-- references.api.ts
|   |-- references.keys.ts
|   \`-- references.queries.ts
|-- components/
|   \`-- reference-select.tsx
\`-- types/
    \`-- reference.types.ts
\`\`\``,

  "auth-feature": `# Auth Feature Pattern

Auth may be a standalone feature:

\`\`\`text
src/features/auth/
|-- login/
|   |-- actions/
|   |   \`-- login.ts
|   |-- form/
|   |   \`-- login-form.tsx
|   |-- validation/
|   |   \`-- login-schema.ts
|   \`-- login-page.tsx
|-- register/
|-- forgot-password/
\`-- reset-password/
\`\`\`

## Rules

- Auth server actions live close to the auth flow they support.
- Auth UI forms live inside the auth feature.
- Auth validation schemas live inside the auth feature.
- Auth page composition lives in feature page components.
- Route files only import and render auth page components.
- Do not mix auth form logic into route files.
- Do not place auth-flow-specific validation in global validators.`,

  "api-layer": `# API Layer Standard

Feature API folders use four files:

\`\`\`text
api/
|-- <feature-or-resource>.api.ts
|-- <feature-or-resource>.keys.ts
|-- <feature-or-resource>.queries.ts
\`-- <feature-or-resource>.mutations.ts
\`\`\`

## File Roles

| File | Role |
| --- | --- |
| \`*.api.ts\` | Raw request functions. No React hooks. No UI. |
| \`*.keys.ts\` | Query key factory. Keep keys predictable and serializable. |
| \`*.queries.ts\` | \`useQuery\` hooks. |
| \`*.mutations.ts\` | \`useMutation\` hooks and cache invalidation/update logic. |

## Shared API Infrastructure

\`\`\`text
src/lib/
|-- api/
|   |-- client.ts
|   |-- errors.ts
|   \`-- query-client.ts
|-- axios-client-config.ts
\`-- server-api.ts
\`\`\`

The exact client setup may vary, but each project should have one clear browser API client pattern and one clear server API client pattern when server calls are needed.

## API Rules

- Components should call feature query/mutation hooks, not raw Axios/fetch.
- Feature API functions should call the shared API client.
- Browser API requests should go through the browser API client.
- Server-side API requests should go through the server API helper.
- API clients do not show toasts.
- API clients do not navigate.
- Query keys must be serializable.
- Mutation hooks should invalidate or update related queries after success.
- Feature components decide how to display success and error feedback.

## Correct Query Hook Pattern

\`\`\`ts
export function useResourcesQuery(filters: ResourceListQuery) {
	return useQuery({
		queryKey: resourceKeys.list(filters),
		queryFn: () => fetchResources(filters)
	});
}
\`\`\`

## Correct Mutation Hook Pattern

\`\`\`ts
export function useCreateResourceMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => createResource(data),
		onSuccess: (newResource) => {
			queryClient.invalidateQueries({
				queryKey: resourceKeys.all
			});
		}
	});
}
\`\`\``,

  "tanstack-query": `# TanStack Query Standard

## Responsibilities

TanStack Query owns API/server state, including:

- Loading state.
- Error state.
- Refetching.
- Cache invalidation.
- Cache updates after mutations.
- Derived server-state freshness.

## Rules

- Do not duplicate API data into local state unless necessary for UI behavior.
- Do not fetch API data directly inside route files.
- Do not call raw API functions from components when a query/mutation hook exists.
- Keep query keys centralized in feature \`*.keys.ts\` files.
- Use predictable key shapes.
- Invalidate broad lists after create/update/delete when cache precision is not worth the complexity.
- Use \`setQueryData\` for detail pages when mutation responses include the full updated entity.

## Query Key Factory Example

\`\`\`ts
export const resourceKeys = {
	all: ["resources"] as const,
	lists: () => [...resourceKeys.all, "list"] as const,
	list: (filters: ResourceListQuery) => [...resourceKeys.lists(), filters] as const,
	details: () => [...resourceKeys.all, "detail"] as const,
	detail: (id: string) => [...resourceKeys.details(), id] as const
};
\`\`\``,

  "url-state": `# URL State Standard with nuqs

URL state belongs in schema files and feature context providers.

Common URL state examples:

- Page number.
- Page size.
- Search query.
- Sort field.
- Sort direction.
- Filters.
- Tabs.
- View mode.

## Rules

- Use \`nuqs\` parsers in schema files.
- Keep filter names backend-compatible when they map to API query params.
- Reset \`page\` to \`1\` when filters change.
- Debounce search before updating query-heavy URL state.
- Do not store sensitive values in the URL.
- Do not hide table/list URL behavior inside route files.
- Keep URL parser defaults explicit.

## Correct URL Parser Pattern

\`\`\`ts
export const resourceSearchParams = {
	page: parseAsInteger.withDefault(1),
	pageSize: parseAsInteger.withDefault(10),
	search: parseAsString.withDefault(""),
	sortBy: parseAsString.withDefault("createdAt"),
	sortOrder: parseAsString.withDefault("desc"),
	status: parseAsString.withDefault("")
};
\`\`\``,

  "list-table": `# List and Table Pattern

All list/table pages should follow this structure:

\`\`\`text
feature page component
-> feature provider/context
-> feature table component or data-columns component
-> feature toolbar component
-> shared table component from src/components/common/table
\`\`\`

## Recommended Table Files

\`\`\`text
src/features/<feature-or-resource>/components/
|-- <resource>-page.tsx
|-- <resource>-table.tsx
|-- <resource>-data-columns.tsx
\`-- <resource>-data-table-toolbar.tsx
\`\`\`

Some projects combine table and columns. That is fine for smaller tables. For large tables, split columns into their own file.

## List Context Responsibilities

Do not skip the context layer for complex table/list pages. It owns:

- \`nuqs\` URL params.
- Debounced search.
- Query filters.
- Pagination handlers.
- Sorting handlers.
- Filter handlers.
- Refresh handlers.
- List-level mutations.
- Option lists for filters.

## Table Rules

- Do not create a second table framework.
- Extend \`src/components/common/table\` only when a shared behavior is needed by multiple features.
- Keep domain-specific columns inside the feature.
- Keep toolbar behavior inside the feature.
- Keep reusable table mechanics in shared table components.
- Avoid route-level table configuration.`,

  forms: `# Form Standard

Forms live in feature \`forms\` folders. Schemas live in feature \`schemas\` folders.

\`\`\`text
forms/
\`-- <thing>-form.tsx

schemas/
\`-- <thing>.schema.ts
\`\`\`

## Rules

- Use React Hook Form.
- Use Zod schemas.
- Use validators from \`src/validators/common-rule.ts\` when possible.
- Keep field names aligned with backend payloads.
- Disable submit while mutation is pending.
- Map backend \`validation_failed\` errors into field errors where possible.
- Reset or close forms only after successful mutation.
- Keep form UI in the feature.
- Keep create/update mutation logic in feature mutation hooks.
- Keep user feedback in the form/page component, not in the API client.

## Adding a New Form

1. Put form UI in \`forms/<thing>-form.tsx\`.
2. Put Zod schema in \`schemas/<thing>.schema.ts\`.
3. Put request/response types in \`types/<thing>.types.ts\`.
4. Put create/update API functions in \`api/<feature-or-resource>.api.ts\`.
5. Put mutation hooks in \`api/<feature-or-resource>.mutations.ts\`.
6. Show user feedback in the form/page component.`,

  validation: `# Validation Standard

Shared validation helpers live in:

\`\`\`text
src/validators/
\`-- common-rule.ts
\`\`\`

Use shared validators for common Zod fields:

- Strings.
- Emails.
- UUIDs.
- Numbers.
- Booleans.
- Arrays.
- Enums.
- Password-like fields.

## Rules

- Put feature-specific validation refinements in feature schema files.
- Do not put feature-specific schemas in \`src/validators\`.
- Keep frontend validation aligned with backend payload expectations.
- Do not treat frontend validation as security enforcement.
- Backend validation remains authoritative.`,

  types: `# Type Standard

Feature types live in feature \`types\` folders.

\`\`\`text
types/
\`-- <feature-or-resource>.types.ts
\`\`\`

Shared global types can live in:

\`\`\`text
@types/
|-- app.d.ts
\`-- user.d.ts
\`\`\`

## Rules

- Put feature-specific API and UI types beside the feature.
- Put truly global declarations in \`@types\`.
- Do not put feature-specific types in global type files.
- Keep API request and response types close to the feature API layer.
- Keep form input types close to schemas and forms.
- Avoid broad \`any\`; prefer explicit feature-level types.`,

  providers: `# Providers Standard

## Recommended Structure

\`\`\`text
src/providers/
|-- auth-provider.tsx
|-- query-provider.tsx
|-- theme-provider.tsx
|-- redirect-provider.tsx
\`-- app-provider.tsx
\`\`\`

Exact providers vary by project.

Common global providers include:

- Auth/session provider.
- TanStack Query provider.
- Theme provider.
- Toast provider.
- URL state adapter.
- Analytics provider.
- Feature flag provider.

## Rules

- Add global providers only when needed across the app.
- Feature-specific providers should live in feature \`context\` folders.
- TanStack Query provider stays global.
- Auth provider usually stays global.
- Theme provider usually stays global.
- Do not wrap individual feature components with global concerns repeatedly.
- Do not introduce new app-wide context when URL state, form state, or TanStack Query is the correct owner.`,

  hooks: `# Hooks Standard

## Recommended Structure

\`\`\`text
src/hooks/
|-- use-auth.ts
|-- use-debounced-value.ts
|-- use-media-query.ts
|-- use-mobile.ts
\`-- use-redirect.ts
\`\`\`

## Rules

- Put reusable cross-feature hooks in \`src/hooks\`.
- Put feature-specific hooks inside the feature folder.
- Do not create a hook folder inside a feature unless the feature actually needs multiple reusable hooks.
- Do not place API fetch hooks in \`src/hooks\`; those belong in feature \`api/*.queries.ts\` and \`api/*.mutations.ts\`.`,

  "route-constants": `# Route Constants Standard

Route constants live in:

\`\`\`text
src/routes/routes.ts
\`\`\`

This file owns:

- Public frontend routes.
- Private frontend routes.
- Protected/auth frontend routes.
- Backend API route paths.
- Frontend/API route prefixes from env.

## Rules

- Add route constants before using a path in navigation, links, route guards, or API files.
- Do not scatter hard-coded backend paths across feature files.
- Keep route naming consistent with existing route objects.
- Prefer route constants over inline strings in components.
- Update route constants when adding a new page or backend endpoint.

## Example

\`\`\`ts
export const route = {
	home: "/",
	auth: {
		login: "/auth/login",
		register: "/auth/register"
	},
	resources: "/resources",
	resourceDetails: (id: string) => \`/resources/\${id}\`
};

export const apiRoute = {
	resources: "/resources",
	resourceDetails: (id: string) => \`/resources/\${id}\`
};
\`\`\``,

  "server-helpers": `# Server Helpers Standard

Server-only helpers live in:

\`\`\`text
src/server/
|-- fetch-auth.ts
\`-- server-only-helper.ts
\`\`\`

## Rules

- Server helpers may use \`next/headers\`, \`cookies\`, and server-only APIs.
- Do not import server helpers into client components.
- Keep browser and server API clients separate.
- Do not leak server-only tokens or cookies into client code.
- Use server helpers only when server-side access is required.`,

  "auth-security": `# Auth and Security Standard

Auth-related files commonly include:

\`\`\`text
src/proxy.ts
src/middleware.ts
src/server/fetch-auth.ts
src/providers/auth-provider.tsx
src/features/auth/login/actions/login.ts
src/features/auth/login/form/login-form.tsx
\`\`\`

Use either \`proxy.ts\` or \`middleware.ts\` depending on the Next.js version and project convention.

## Rules

- Do not change auth routing protection unless working on auth or authorization.
- Do not trust frontend role checks as security.
- Backend authorization remains authoritative.
- Keep redirect URLs origin-safe.
- Do not place secrets in \`NEXT_PUBLIC_*\` variables.
- Use frontend checks for user experience only.
- Never expose server-only credentials in client components.`,

  environment: `# Environment Standard

Common public env vars may include:

\`\`\`bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FRONTEND_URL=
\`\`\`

Project-specific public values may include analytics IDs, OAuth client IDs, or public feature flag keys.

Environment helper:

\`\`\`text
src/core/env.ts
\`\`\`

## Rules

- Add env variables to the env schema when they become required.
- Add \`.env.example\` for onboarding when possible.
- Never commit \`.env.local\` or secrets.
- Use \`NEXT_PUBLIC_\` only for values that are safe in the browser.
- Do not read raw env values throughout the app when a helper exists.`,

  styling: `# Styling Standard

Styling files:

\`\`\`text
src/app/globals.css
components.json
postcss.config.mjs
\`\`\`

## Rules

- Use Tailwind utilities.
- Use shadcn theme tokens and CSS variables.
- Use \`cn()\` from \`src/lib/utils.ts\` for conditional classes.
- Keep global theme tokens in \`globals.css\`.
- Do not add hard-coded one-off design systems in feature folders.
- Do not add random global CSS unless it is truly global.
- Prefer existing UI primitives before creating new visual patterns.`,

  "error-handling": `# Error Handling Standard

Shared API error normalization usually lives in:

\`\`\`text
src/lib/api/errors.ts
\`\`\`

Feature error mapping should live near the feature:

\`\`\`text
src/features/<feature>/utils/<feature>-errors.ts
\`\`\`

For large domains:

\`\`\`text
src/features/<domain>/shared/utils/<domain>-errors.ts
src/features/<domain>/<resource>/utils/<resource>-errors.ts
\`\`\`

## Rules

- API clients normalize errors but do not show UI.
- Feature utilities translate backend codes into user-facing messages.
- Forms map backend field errors when possible.
- Page/list errors render inline alert components.
- Mutations may show toast feedback in feature components.
- Keep user-facing error copy consistent across related features.
- Do not hide backend validation details when they are useful to the form.`,

  documentation: `# Documentation Standard

## Recommended Structure

\`\`\`text
docs/
|-- frontend-development-standard.md
|-- memory/
|   \`-- durable-decisions.md
\`-- plan/
    \`-- feature-implementation-plan.md
\`\`\`

## Rules

- Put implementation plans in \`docs/plan\`.
- Put durable decisions and memory in \`docs/memory\`.
- Keep frontend architecture standards in a clearly named docs file.
- Update documentation when structure, conventions, setup, or workflows change.
- If a new feature does not fit any existing pattern, document the proposed structure in \`docs/plan\` before implementing it.
- Do not create multiple competing documentation folders for the same purpose.`,

  naming: `# Naming Rules

| Thing | Rule | Example |
| --- | --- | --- |
| Files | kebab-case with role suffix | \`resource-form.tsx\` |
| Components | PascalCase | \`ResourceForm\` |
| Hooks | \`use-*.ts\` file and \`useSomething\` function | \`use-auth.ts\`, \`useAuth\` |
| Query files | plural or feature name plus role | \`resources.queries.ts\` |
| Mutation files | plural or feature name plus role | \`resources.mutations.ts\` |
| Schema files | singular domain name | \`resource.schema.ts\` |
| Type files | singular domain name | \`resource.types.ts\` |
| Context files | page/list purpose | \`resources-list-context.tsx\` |
| Constants | UPPER_SNAKE for true constants | \`DEFAULT_LOGIN_REDIRECT\` |`,

  imports: `# Import Rules

Use the existing alias:

\`\`\`ts
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
\`\`\`

Preferred import order:

\`\`\`ts
// React / Next imports
// Third-party imports
// Shared app imports from @/
// Feature imports from @/
// Relative imports, when local
\`\`\`

## Rules

- Do not introduce barrel files unless the team agrees.
- Import from the source file that already exists.
- Prefer \`@/\` aliases for app-level imports.
- Use relative imports only when files are local siblings or close neighbors.
- Keep imports organized and readable.`,

  "adding-page": `# Adding a New Page

Use this checklist:

1. Add route constant to \`src/routes/routes.ts\`.
2. Add route file under \`src/app/.../page.tsx\`.
3. Create or reuse a feature page component under \`src/features/.../components\`.
4. Add navigation only if it belongs in the app shell.
5. Keep the route file thin.
6. Add metadata in the route file.
7. Keep data fetching in feature query hooks or server helpers, not route UI.

## Route File Example

\`\`\`tsx
import type { Metadata } from "next";

import { ResourcesPage } from "@/features/resources/components/resources-page";

export const metadata: Metadata = {
	title: "Resources",
	description: "Manage resources."
};

export default function Page() {
	return <ResourcesPage />;
}
\`\`\``,

  "adding-list": `# Adding a New List/Table Feature

Follow this pattern:

\`\`\`text
src/features/<domain-or-feature>/<resource-optional>/
|-- api/
|   |-- <resource>.api.ts
|   |-- <resource>.keys.ts
|   |-- <resource>.queries.ts
|   \`-- <resource>.mutations.ts
|-- components/
|   |-- <resource>-data-table-toolbar.tsx
|   |-- <resource>-page.tsx
|   \`-- <resource>-table.tsx
|-- context/
|   \`-- <resource>-list-context.tsx
|-- forms/
|   \`-- <resource-singular>-form.tsx
|-- schemas/
|   \`-- <resource-singular>.schema.ts
\`-- types/
    \`-- <resource-singular>.types.ts
\`\`\`

## Checklist

1. Confirm whether the feature is standalone or belongs under a larger domain.
2. Add route constants.
3. Add route file.
4. Add feature page component.
5. Add context provider for URL/list state when the list is complex.
6. Add table component.
7. Add toolbar component.
8. Add API files.
9. Add query keys.
10. Add query hooks.
11. Add mutation hooks if the list supports create/update/delete/actions.
12. Add schemas and types.
13. Wire error handling through feature utilities.
14. Reuse shared table components.
15. Update documentation when needed.`,

  "adding-api": `# Adding a New API Endpoint

Use this checklist:

1. Add backend path to \`apiRoute\` in \`src/routes/routes.ts\`.
2. Add raw function in feature \`api/*.api.ts\`.
3. Add query key in feature \`api/*.keys.ts\`.
4. Add query or mutation hook.
5. Invalidate or update affected queries after mutations.
6. Normalize user-facing errors through feature error utilities.
7. Use the query/mutation hook from components.

## Rules

- Do not call backend paths directly from components.
- Do not duplicate route strings across files.
- Do not show toasts in raw API functions.
- Do not navigate from API functions.`,

  "state-ownership": `# State Ownership

| State type | Owner |
| --- | --- |
| API/server state | TanStack Query hooks |
| URL filters/sort/page/search | \`nuqs\` in feature schemas and contexts |
| Form values | React Hook Form |
| Auth user | Auth provider |
| Redirect URL | Redirect provider or auth flow owner |
| Theme | Theme provider |
| Sidebar open/collapse | Layout/sidebar provider |
| Feature table orchestration | Feature \`context\` folder |
| One-off component state | Local component state |

## Rules

- Do not add Zustand, Redux, Jotai, or another global store unless the team approves it.
- Avoid duplicating ownership across state systems.
- Prefer the narrowest correct owner.
- Use global state only for truly global concerns.`,

  "files-avoid": `# Files to Avoid Changing Casually

| File/folder | Why |
| --- | --- |
| \`src/proxy.ts\` or \`src/middleware.ts\` | Auth and route protection |
| \`src/lib/axios-client-config.ts\` | Browser API, cookies, CSRF |
| \`src/lib/server-api.ts\` | Server API, cookies, CSRF |
| \`src/lib/api/errors.ts\` | Shared API error contract |
| \`@types/*\` | Global type contracts |
| \`src/components/ui/*\` | Shared primitive layer |
| \`pnpm-lock.yaml\` | Dependency lockfile |
| \`.github/**\` | CI, automation, or AI guidance |
| \`docs/memory/*\` | Decision history |`,

  "avoid-without-approval": `# Do Not Add Without Approval

Do not add these without explicit team approval:

- Root-level \`app\` when the project uses \`src/app\`.
- Root-level \`pages\` when the project uses App Router.
- Global stores such as Zustand/Redux/Jotai.
- A second table framework.
- A second API client pattern.
- A second UI primitive system.
- Multiple competing docs folders for the same purpose.
- Hard-coded route strings scattered across components.`,
};

export const getContentBySlug = (slug: string): string => {
  return docContent[slug] || "Content not found";
};
