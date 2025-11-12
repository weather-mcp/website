'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';

const configExample = `{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@dgahagan/weather-mcp"],
      "env": {
        "NOAA_API_TOKEN": "your-token-here"
      }
    }
  }
}`;

export function QuickStart() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(configExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 sm:py-32 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Get Started in Minutes
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Follow these simple steps to integrate Weather MCP with Claude Desktop
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Get a NOAA API Token
                </h3>
                <p className="mt-2 text-neutral-600">
                  Register for a free API token at{' '}
                  <a
                    href="https://www.weather.gov/documentation/services-web-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    weather.gov
                  </a>
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Configure Claude Desktop
                </h3>
                <p className="mt-2 text-neutral-600">
                  Add this to your Claude Desktop configuration file:
                </p>
                <div className="mt-4 relative">
                  <pre className="bg-neutral-900 text-neutral-100 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                    {configExample}
                  </pre>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-white text-xs rounded transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
                  3
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Start Using Weather Tools
                </h3>
                <p className="mt-2 text-neutral-600">
                  Restart Claude Desktop and try asking:
                </p>
                <div className="mt-4 bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <p className="text-primary-900 font-medium italic">
                    "What's the weather forecast for Seattle this week?"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/docs/getting-started">
              <Button variant="outline" size="lg">
                Full Installation Guide →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
