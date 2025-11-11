# Weather MCP Website

Public website and analytics dashboard for the Weather MCP project, hosted at [weather-mcp.dev](https://weather-mcp.dev).

## Overview

This Next.js application serves as:

1. **Project Homepage** - Introduction, features, and documentation
2. **Analytics Dashboard** - Public, real-time analytics from MCP server usage
3. **Documentation Hub** - Comprehensive guides and API references
4. **Community Portal** - Links to GitHub, discussions, and contributions

## Features

### Homepage
- Project overview and value proposition
- Quick start guide
- Feature highlights
- Installation instructions
- Community stats (active installations, API calls, uptime)

### Analytics Dashboard
- Real-time usage statistics
- Tool popularity charts
- Performance metrics (response times, cache hit rates)
- Error tracking and trends
- Geographic distribution (country-level)
- API service usage (NOAA vs Open-Meteo)

### Documentation
- Getting started guide
- API reference
- Configuration options
- MCP integration guide
- Privacy policy
- Analytics transparency

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Fetching**: SWR (for real-time updates)
- **Deployment**: Vercel or self-hosted

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
# Analytics API endpoint
NEXT_PUBLIC_ANALYTICS_API=https://analytics.weather-mcp.dev/v1

# Optional: Analytics refresh interval (ms)
NEXT_PUBLIC_REFRESH_INTERVAL=30000
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
website/
├── src/
│   ├── pages/
│   │   ├── index.tsx          # Homepage
│   │   ├── dashboard.tsx      # Analytics dashboard
│   │   └── docs/              # Documentation pages
│   │       ├── getting-started.tsx
│   │       ├── api-reference.tsx
│   │       └── privacy.tsx
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   │   ├── ToolUsageChart.tsx
│   │   │   ├── PerformanceMetrics.tsx
│   │   │   ├── ErrorSummary.tsx
│   │   │   └── GeoMap.tsx
│   │   └── common/            # Reusable components
│   ├── api/
│   │   └── analytics.ts       # API client for analytics-server
│   ├── styles/
│   │   └── globals.css        # Global styles + Tailwind
│   └── utils/
│       ├── formatters.ts      # Data formatting utilities
│       └── constants.ts       # App constants
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
└── next.config.js
```

## Key Pages

### / (Homepage)
- Hero section with project introduction
- Feature showcase
- Quick start guide
- Installation instructions
- Links to GitHub and documentation

### /dashboard
- Overview statistics (total calls, success rate, avg response time)
- Interactive charts:
  - Tool usage over time
  - Response time percentiles
  - Error rates
  - Cache performance
- Real-time updates via SWR
- Filterable by time range (24h, 7d, 30d)

### /docs
- Getting started guide
- Installation and configuration
- Usage examples
- API reference
- Privacy and analytics information
- Troubleshooting

## API Integration

The website fetches data from the analytics-server API:

```typescript
// src/api/analytics.ts
export async function getOverviewStats(period: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ANALYTICS_API}/stats/overview?period=${period}`
  );
  return response.json();
}
```

Uses SWR for automatic caching and revalidation:

```typescript
// In dashboard component
const { data, error } = useSWR(
  '/stats/overview',
  () => getOverviewStats('7d'),
  { refreshInterval: 30000 } // Refresh every 30 seconds
);
```

## Styling

Tailwind CSS with custom theme:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // Blue
        secondary: '#10B981',  // Green
        accent: '#F59E0B',     // Amber
      }
    }
  }
}
```

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Self-Hosted (Docker)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Deploy with docker-compose:
```yaml
website:
  build: ../website
  ports:
    - "3000:3000"
  environment:
    - NEXT_PUBLIC_ANALYTICS_API=https://analytics.weather-mcp.dev/v1
```

## Performance

- Static generation for homepage and docs
- Incremental Static Regeneration (ISR) for dashboard (revalidate every 60s)
- Client-side data fetching for real-time updates
- Image optimization via Next.js Image component
- Code splitting and lazy loading

## Contributing

See `../docs/contributing.md` for contribution guidelines.

## License

MIT

## Links

- [Live Website](https://weather-mcp.dev)
- [Analytics Dashboard](https://weather-mcp.dev/dashboard)
- [GitHub Organization](https://github.com/weather-mcp)
- [MCP Server Repository](https://github.com/weather-mcp/mcp-server)
- [Analytics Server Repository](https://github.com/weather-mcp/analytics-server)
- [Website Repository](https://github.com/weather-mcp/website)
