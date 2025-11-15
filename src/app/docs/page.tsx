import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/common/Card';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Complete documentation for Weather MCP, including installation guides, API reference, and examples.',
};

const docSections = [
  {
    title: 'Getting Started',
    description: 'Quick guide to installing and using Weather MCP',
    href: '/docs/getting-started',
  },
  {
    title: 'Installation',
    description: 'Detailed installation steps and configuration',
    href: '/docs/installation',
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation for all tools',
    href: '/docs/api-reference',
  },
  {
    title: 'Privacy & Analytics',
    description: 'Learn about our privacy-first approach',
    href: '/docs/privacy',
  },
];

export default function Docs() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Documentation
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">
        Everything you need to know about Weather MCP
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {docSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card hover padding="md" className="h-full">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {section.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">{section.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
