import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { TableOfContents } from '@/components/docs/TableOfContents';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Docs | Weather MCP',
    default: 'Documentation',
  },
  description: 'Complete documentation for Weather MCP - installation, configuration, and API reference.',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidebar */}
      <DocsSidebar />

      {/* Main content */}
      <main className="flex-1 max-w-4xl px-8 py-8">
        <Breadcrumbs />
        <article className="prose prose-neutral max-w-none">
          {children}
        </article>
      </main>

      {/* Table of Contents */}
      <TableOfContents />
    </div>
  );
}
