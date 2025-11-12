import type { Metadata } from 'next';
import { ExampleCard } from '@/components/examples/ExampleCard';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Practical examples and use cases for Weather MCP',
};

const examples = [
  {
    title: 'Simple Weather Check',
    description: 'Get current weather conditions for any location',
    category: 'Basic',
    difficulty: 'beginner' as const,
    tools: ['get_current_conditions'],
    code: `Ask Claude:
"What's the weather like in Seattle right now?"

Claude will automatically:
1. Use search_location to find Seattle coordinates
2. Call get_current_conditions with those coordinates
3. Present the weather in natural language`,
  },
  {
    title: 'Weekly Forecast',
    description: 'Plan your week with a 7-day forecast',
    category: 'Planning',
    difficulty: 'beginner' as const,
    tools: ['get_forecast'],
    code: `Ask Claude:
"What's the 7-day forecast for Tokyo?"

Response includes:
- Daily high/low temperatures
- Precipitation chances
- Wind conditions
- Weather descriptions`,
  },
  {
    title: 'Travel Planning',
    description: 'Check weather conditions at multiple destinations',
    category: 'Planning',
    difficulty: 'intermediate' as const,
    tools: ['get_forecast', 'get_current_conditions'],
    code: `Ask Claude:
"I'm traveling from New York to San Francisco next week.
What's the forecast for both cities?"

Claude will:
1. Get forecasts for both locations
2. Compare conditions
3. Provide packing recommendations`,
  },
  {
    title: 'Severe Weather Alerts',
    description: 'Monitor weather warnings and alerts (US only)',
    category: 'Safety',
    difficulty: 'beginner' as const,
    tools: ['get_alerts'],
    code: `Ask Claude:
"Are there any weather alerts in Florida?"

Response includes:
- Active warnings, watches, advisories
- Severity levels and timing
- Affected areas
- Recommended actions`,
  },
  {
    title: 'Event Planning',
    description: 'Check weather for outdoor events',
    category: 'Planning',
    difficulty: 'intermediate' as const,
    tools: ['get_forecast', 'get_current_conditions'],
    code: `Ask Claude:
"I'm planning an outdoor wedding in Austin on July 15th.
What should I expect for weather?"

Claude will:
1. Get forecast for that date
2. Provide temperature range
3. Assess precipitation risk
4. Suggest contingency plans`,
  },
  {
    title: 'Road Trip Weather',
    description: 'Check conditions along your route',
    category: 'Travel',
    difficulty: 'intermediate' as const,
    tools: ['get_forecast', 'get_alerts', 'search_location'],
    code: `Ask Claude:
"I'm driving from Chicago to Denver tomorrow.
What's the weather like along I-80?"

Claude will check:
1. Departure and destination weather
2. Major cities along the route
3. Any weather alerts for the area
4. Recommended departure times`,
  },
  {
    title: 'Outdoor Activity Planning',
    description: 'Optimize timing for outdoor activities',
    category: 'Recreation',
    difficulty: 'intermediate' as const,
    tools: ['get_forecast', 'get_current_conditions'],
    code: `Ask Claude:
"When's the best time to go hiking in Yosemite this weekend?"

Claude analyzes:
1. Hourly forecasts for both days
2. Temperature comfort ranges
3. Precipitation timing
4. Wind conditions`,
  },
  {
    title: 'International Travel',
    description: 'Check weather in multiple time zones',
    category: 'Travel',
    difficulty: 'advanced' as const,
    tools: ['get_forecast', 'search_location'],
    code: `Ask Claude:
"I'm traveling to London, Paris, and Rome next month.
What's the typical weather and what should I pack?"

Claude provides:
1. Forecasts for all three cities
2. Temperature comparisons
3. Precipitation patterns
4. Packing recommendations`,
  },
  {
    title: 'Marine Weather',
    description: 'Check conditions for water activities',
    category: 'Recreation',
    difficulty: 'intermediate' as const,
    tools: ['get_forecast', 'get_current_conditions', 'get_alerts'],
    code: `Ask Claude:
"Is it safe to go sailing in San Diego Bay today?"

Claude checks:
1. Current wind speeds and direction
2. Wave conditions (if available)
3. Marine weather alerts
4. Forecast for next few hours`,
  },
  {
    title: 'Daily Commute Check',
    description: 'Quick weather check for your commute',
    category: 'Daily',
    difficulty: 'beginner' as const,
    tools: ['get_current_conditions', 'get_forecast'],
    code: `Ask Claude:
"Do I need an umbrella for my commute today?"

Claude will:
1. Check current conditions
2. Review hourly forecast
3. Assess precipitation probability
4. Give yes/no recommendation`,
  },
  {
    title: 'Agriculture & Farming',
    description: 'Monitor weather for farming decisions',
    category: 'Agriculture',
    difficulty: 'advanced' as const,
    tools: ['get_forecast', 'get_alerts'],
    code: `Ask Claude:
"What's the frost risk for my farm in Iowa this week?"

Claude analyzes:
1. Overnight low temperatures
2. Frost advisories
3. Day-by-day risk assessment
4. Protective action timing`,
  },
  {
    title: 'Photography Planning',
    description: 'Find optimal conditions for outdoor photography',
    category: 'Recreation',
    difficulty: 'intermediate' as const,
    tools: ['get_forecast'],
    code: `Ask Claude:
"When's the best time for sunset photography
at the Golden Gate Bridge this week?"

Claude provides:
1. Cloud cover predictions
2. Visibility conditions
3. Optimal days and times
4. Backup options`,
  },
];

export default function Examples() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Examples
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl">
            Explore practical examples of how to use Weather MCP with Claude Desktop.
            These examples cover common use cases from simple weather checks to complex planning scenarios.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Example Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">
              All Examples
            </span>
            <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 cursor-pointer transition-colors">
              Basic
            </span>
            <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 cursor-pointer transition-colors">
              Planning
            </span>
            <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 cursor-pointer transition-colors">
              Travel
            </span>
            <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 cursor-pointer transition-colors">
              Recreation
            </span>
            <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 cursor-pointer transition-colors">
              Safety
            </span>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <ExampleCard key={example.title} {...example} />
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-primary-50 border border-primary-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            💡 Tips for Best Results
          </h2>
          <ul className="space-y-3 text-neutral-700">
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                <strong>Be specific with locations:</strong> Include city and state/country for best results
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                <strong>Ask naturally:</strong> Claude understands conversational requests
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                <strong>Multiple locations:</strong> You can ask about several places at once
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                <strong>Time ranges:</strong> Specify "today," "tomorrow," "this week," etc.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                <strong>Follow-up questions:</strong> Claude remembers context, so you can ask follow-ups
              </span>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-neutral-600 mb-6">
            Install Weather MCP and start using these examples with Claude Desktop
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/docs/installation"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Installation Guide
            </a>
            <a
              href="/docs/api-reference"
              className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium"
            >
              API Reference
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
