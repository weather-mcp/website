import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-800 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl md:text-6xl animate-fade-in">
            Access Real-World Weather Data in{' '}
            <span className="text-primary-600 dark:text-primary-400">Claude Desktop</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400 sm:text-xl animate-slide-up">
            MCP server providing forecasts, alerts, and current conditions from NOAA and Open-Meteo
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="/docs/getting-started">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Analytics
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-600 dark:text-neutral-400 animate-fade-in">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-accent-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-secondary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Privacy-First</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Fast & Reliable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-secondary-200 dark:from-primary-800 dark:to-secondary-800 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
}
