"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  FileText,
  Layers3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const highlights = [
  "Feature-first folder structure",
  "Opinionated but easy to extend",
  "Docs that stay easy to scan",
];

const pillars = [
  {
    icon: Layers3,
    title: "Clear architecture",
    description:
      "See how routes, features, providers, and shared UI fit together without the usual Next.js sprawl.",
  },
  {
    icon: Sparkles,
    title: "Practical standards",
    description:
      "Documented patterns for data flow, composition, and component boundaries keep the app consistent.",
  },
  {
    icon: FileText,
    title: "Fast navigation",
    description:
      "Jump straight into the sections that matter instead of hunting through a wall of text.",
  },
];

const quickLinks = [
  {
    href: "/docs/introduction",
    title: "Introduction",
    description: "Start with the core ideas behind the documentation.",
  },
  {
    href: "/docs/recommended-stack",
    title: "Recommended stack",
    description: "Review the tooling and libraries that shape the project.",
  },
  {
    href: "/docs/features",
    title: "Feature folder standard",
    description: "Understand how feature-oriented structure stays organized.",
  },
  {
    href: "/docs/api-layer",
    title: "API layer standard",
    description:
      "See the conventions for server communication and data access.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_22%),linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(241,245,249,1)_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_22%),linear-gradient(180deg,rgba(2,6,23,1)_0%,rgba(15,23,42,1)_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <section className="grid items-center gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <Card className="border-border/70 bg-background/78 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <CardContent className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div className="space-y-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <Compass className="h-3.5 w-3.5 text-sky-500" />
                  Next.js stack documentation
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                    A cleaner way to document the way your app is built.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                    This guide turns the feature-based Next.js stack into a
                    layout that is easy to scan, easier to trust, and simple to
                    extend when the codebase grows.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/docs">
                    <Button size="lg" className="gap-2 px-5">
                      <BookOpen className="h-4.5 w-4.5" />
                      Read the docs
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs/introduction">
                    <Button size="lg" variant="outline" className="gap-2 px-5">
                      <Sparkles className="h-4.5 w-4.5" />
                      Start here
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-2 rounded-2xl border border-border bg-muted/35 px-4 py-3 text-sm text-muted-foreground shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-background/74 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.42)] backdrop-blur-xl">
            <CardHeader className="border-b border-border/70 pb-5">
              <CardDescription className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                At a glance
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                What this docs site helps you do
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 py-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.title}
                    className="flex gap-4 rounded-2xl border border-border bg-background/60 p-4 shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="font-medium text-foreground">
                        {pillar.title}
                      </h2>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3 lg:mt-8">
          <Card className="border-border/70 bg-background/72 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_-50px_rgba(15,23,42,0.55)]">
            <CardHeader>
              <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Layers3 className="h-5 w-5" />
              </div>
              <CardTitle>Clear architecture</CardTitle>
              <CardDescription>
                Understand how features, shared UI, and documentation pages fit
                together without extra noise.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/70 bg-background/72 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_-50px_rgba(15,23,42,0.55)]">
            <CardHeader>
              <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle>Practical standards</CardTitle>
              <CardDescription>
                Patterns for layout, navigation, and composition stay consistent
                across the docs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/70 bg-background/72 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_-50px_rgba(15,23,42,0.55)]">
            <CardHeader>
              <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle>Quick navigation</CardTitle>
              <CardDescription>
                Jump straight into the most relevant sections instead of
                scrolling through a flat intro page.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="mt-6 lg:mt-8">
          <Card className="border-border/70 bg-background/78 shadow-[0_24px_90px_-60px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <CardHeader className="border-b border-border/70 pb-5">
              <CardDescription className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Quick navigation
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Go straight to the useful sections
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 px-6 py-6 md:grid-cols-2">
              {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className="group block">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-muted/30 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border/90 hover:bg-muted/55 hover:shadow-sm">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground/80">
                      Open section
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
