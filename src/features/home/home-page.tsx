"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background to-muted/50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="space-y-4 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Next.js Stack
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500">
              Developer Documentation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A comprehensive guide for building scalable, maintainable Next.js
            applications with a feature-based architecture.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/docs">
            <Button size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              Read Documentation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            <Zap className="w-5 h-5 mr-2" />
            Quick Start
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Guide</h3>
            <p className="text-muted-foreground">
              Learn the complete Next.js stack architecture and best practices
              for organizing your projects.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
            <p className="text-muted-foreground">
              Discover proven patterns and standards for API layers, forms,
              state management, and more.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Clear Structure</h3>
            <p className="text-muted-foreground">
              Follow consistent patterns across all features and components in
              your application.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-lg border border-border bg-card/50 p-8">
          <h2 className="text-2xl font-bold mb-6">Quick Navigation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/introduction" className="group">
              <div className="p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  Introduction
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get started with the documentation
                </p>
              </div>
            </Link>
            <Link href="/docs/recommended-stack" className="group">
              <div className="p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  Recommended Stack
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore the recommended tech stack
                </p>
              </div>
            </Link>
            <Link href="/docs/features" className="group">
              <div className="p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  Feature Folder Standard
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn about feature organization
                </p>
              </div>
            </Link>
            <Link href="/docs/api-layer" className="group">
              <div className="p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  API Layer Standard
                </h3>
                <p className="text-sm text-muted-foreground">
                  Best practices for API integration
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
