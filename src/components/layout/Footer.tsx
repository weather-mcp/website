import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-4">Weather MCP</h3>
            <p className="text-sm text-neutral-600">
              Real-world weather data for Claude Desktop through the Model Context Protocol.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/getting-started" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/api-reference" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/privacy" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/dgahagan/weather-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-center text-sm text-neutral-600">
            © {new Date().getFullYear()} Weather MCP. Open source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
