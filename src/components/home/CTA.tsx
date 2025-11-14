import React from 'react';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            Join hundreds of developers using Weather MCP to bring real-world weather data to Claude Desktop
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/docs/getting-started">
              <button className="px-6 py-3 text-lg font-medium rounded-lg bg-white text-primary-600 hover:bg-primary-50 active:bg-primary-100 transition-colors duration-200 w-full sm:w-auto">
                Get Started
              </button>
            </Link>
            <a
              href="https://github.com/dgahagan/weather-mcp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-6 py-3 text-lg font-medium rounded-lg border-2 border-white text-white hover:bg-primary-700 active:bg-primary-800 transition-colors duration-200 w-full sm:w-auto">
                View on GitHub
              </button>
            </a>
          </div>

          <p className="mt-8 text-sm text-primary-200">
            Free and open source. MIT License.
          </p>
        </div>
      </div>
    </section>
  );
}
