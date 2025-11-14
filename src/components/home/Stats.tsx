'use client';

import React from 'react';
import { Card } from '@/components/common/Card';

// Mock data - in production this would come from the analytics API
const stats = [
  { label: 'API Calls (24h)', value: '12,451', trend: '+12.5%' },
  { label: 'Success Rate', value: '99.2%', trend: '+0.3%' },
  { label: 'Active Installations', value: '247', trend: '+18%' },
  { label: 'Uptime (30d)', value: '99.9%', trend: 'stable' },
];

export function Stats() {
  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Real-Time Project Health
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Transparent analytics showing how Weather MCP performs in production
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} hover padding="md">
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
              <div className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {stat.value}
              </div>
              <div className="mt-2 flex items-center text-sm">
                {stat.trend.startsWith('+') ? (
                  <svg
                    className="h-4 w-4 text-secondary-500 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ) : stat.trend === 'stable' ? (
                  <svg
                    className="h-4 w-4 text-neutral-500 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14"
                    />
                  </svg>
                ) : null}
                <span
                  className={
                    stat.trend.startsWith('+')
                      ? 'text-secondary-600'
                      : 'text-neutral-600'
                  }
                >
                  {stat.trend}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/dashboard"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            View Full Dashboard →
          </a>
        </div>
      </div>
    </section>
  );
}
