'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Download,
  Settings,
  Code,
  Cloud,
  CloudRain,
  AlertTriangle,
  MapPin,
  Shield,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface DocLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DocSection {
  title: string;
  links: DocLink[];
}

const docSections: DocSection[] = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Introduction', href: '/docs', icon: BookOpen },
      { title: 'Installation', href: '/docs/installation', icon: Download },
      { title: 'Configuration', href: '/docs/configuration', icon: Settings },
    ],
  },
  {
    title: 'API Reference',
    links: [
      { title: 'Overview', href: '/docs/api-reference', icon: Code },
    ],
  },
  {
    title: 'Tools',
    links: [
      { title: 'Get Forecast', href: '/docs/tools/get-forecast', icon: Cloud },
      { title: 'Current Conditions', href: '/docs/tools/get-current-conditions', icon: CloudRain },
      { title: 'Weather Alerts', href: '/docs/tools/get-alerts', icon: AlertTriangle },
      { title: 'Search Location', href: '/docs/tools/search-location', icon: MapPin },
    ],
  },
  {
    title: 'Additional Resources',
    links: [
      { title: 'Privacy & Analytics', href: '/docs/privacy', icon: Shield },
      { title: 'Troubleshooting', href: '/docs/troubleshooting', icon: HelpCircle },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
      <nav className="p-6 space-y-8" aria-label="Documentation navigation">
        {docSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                      <span className="flex-1">{link.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
