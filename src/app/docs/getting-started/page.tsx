import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started',
  description:
    'Quick guide to installing and using Weather MCP with Claude Desktop.',
};

export default function GettingStarted() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
        Getting Started
      </h1>

      <div className="prose prose-neutral max-w-none">
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          Weather MCP brings real-world weather data to Claude Desktop through the Model Context Protocol.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
          Prerequisites
        </h2>
        <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2">
          <li>Claude Desktop installed</li>
          <li>Node.js 18+ (for npx)</li>
          <li>A free NOAA API token</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
          Quick Installation
        </h2>
        <ol className="list-decimal pl-6 text-neutral-700 dark:text-neutral-300 space-y-4">
          <li>
            <strong className="dark:text-neutral-200">Get a NOAA API token</strong>
            <p className="mt-2">
              Visit{' '}
              <a
                href="https://www.weather.gov/documentation/services-web-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
              >
                weather.gov
              </a>{' '}
              to register for a free API token.
            </p>
          </li>
          <li>
            <strong className="dark:text-neutral-200">Configure Claude Desktop</strong>
            <p className="mt-2">
              Add the following to your Claude Desktop configuration file:
            </p>
            <pre className="mt-4 bg-neutral-900 text-neutral-100 rounded-lg p-4 overflow-x-auto text-sm">
{`{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@dgahagan/weather-mcp"],
      "env": {
        "NOAA_API_TOKEN": "your-token-here"
      }
    }
  }
}`}
            </pre>
          </li>
          <li>
            <strong className="dark:text-neutral-200">Restart Claude Desktop</strong>
            <p className="mt-2">
              Completely quit and restart Claude Desktop to load the new MCP server.
            </p>
          </li>
          <li>
            <strong className="dark:text-neutral-200">Try it out!</strong>
            <p className="mt-2">
              Ask Claude: "What's the weather forecast for Seattle this week?"
            </p>
          </li>
        </ol>

        <div className="bg-primary-50 dark:bg-neutral-800/50 border border-primary-200 dark:border-neutral-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-neutral-100 mb-2">
            Next Steps
          </h3>
          <p className="text-primary-800 dark:text-neutral-200">
            Check out the full documentation to learn about all available tools, configuration options, and advanced features.
          </p>
        </div>
      </div>
    </div>
  );
}
