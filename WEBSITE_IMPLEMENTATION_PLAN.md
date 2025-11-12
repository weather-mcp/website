# Weather MCP Website - Implementation Plan

**Version:** 1.0
**Date:** 2025-11-11
**Status:** 🔄 Phase 1 Complete - Phase 2 In Progress
**Domain:** weather-mcp.dev
**Dev Server:** http://localhost:3002

## Executive Summary

This document outlines the complete implementation plan for the Weather MCP public website and analytics dashboard. The website serves as the public face of the Weather MCP project, providing documentation, real-time analytics, and community engagement.

**Core Objectives:**
- **Inform**: Clear documentation and onboarding for new users
- **Visualize**: Real-time analytics dashboard showing project health
- **Engage**: Community hub with resources and contribution pathways
- **Perform**: Fast, accessible, SEO-optimized experience
- **Trust**: Transparent analytics and privacy-focused design

**Tech Stack**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts, SWR

---

## 0. Implementation Status (Updated: 2025-11-12)

### ✅ Phase 1: Foundation - COMPLETED

**Implemented Components:**
- `src/app/layout.tsx` - Root layout with Header and Footer
- `src/app/page.tsx` - Homepage with all sections
- `src/app/globals.css` - Global styles and Tailwind setup
- `src/components/layout/Header.tsx` - Sticky header with navigation
- `src/components/layout/Footer.tsx` - Footer with links
- `src/components/layout/Navigation.tsx` - Desktop navigation
- `src/components/layout/MobileMenu.tsx` - Mobile hamburger menu
- `src/components/home/Hero.tsx` - Hero section with CTA
- `src/components/home/Features.tsx` - Features grid (6 features)
- `src/components/home/QuickStart.tsx` - Installation guide with code copying
- `src/components/home/Stats.tsx` - Live statistics cards
- `src/components/home/CTA.tsx` - Call-to-action section
- `src/components/common/Button.tsx` - Reusable button component
- `src/components/common/Card.tsx` - Card component with hover effects
- `src/components/common/Badge.tsx` - Badge component with variants
- `src/components/common/Spinner.tsx` - Loading spinner
- `src/types/analytics.ts` - TypeScript type definitions
- `src/lib/api.ts` - Analytics API client with error handling
- `tailwind.config.js` - Complete design system configuration
- `postcss.config.js` - PostCSS configuration

**Pages Created:**
- `/` - Homepage (fully implemented)
- `/dashboard` - Dashboard placeholder
- `/docs` - Documentation hub
- `/docs/getting-started` - Installation guide
- `/examples` - Examples placeholder
- `/community` - Community placeholder

**Infrastructure:**
- ✅ Next.js 14 with App Router
- ✅ TypeScript configured and working
- ✅ Tailwind CSS with custom design system
- ✅ SEO metadata, sitemap.xml, robots.txt
- ✅ Build successful with no errors
- ✅ Dev server running on port 3002

**Build Status:**
```
✓ Compiled successfully
✓ Generating static pages (11/11)
✓ No TypeScript errors
✓ First Load JS: 87.2 kB (shared)
✓ Homepage: 98.4 kB total
```

### ✅ Phase 2: Dashboard - COMPLETED

**Implemented Components:**
- `src/app/dashboard/page.tsx` - Full dashboard with mock data
- `src/components/dashboard/TimeRangeSelector.tsx` - Time range picker
- `src/components/dashboard/MetricCard.tsx` - Animated metric cards
- `src/components/dashboard/ToolUsageChart.tsx` - Stacked area chart
- `src/components/dashboard/PerformanceChart.tsx` - Response time percentiles
- `src/components/dashboard/ErrorSummary.tsx` - Error breakdown
- `src/components/dashboard/CacheMetrics.tsx` - Cache performance stats
- `src/components/dashboard/ServiceDistribution.tsx` - Pie chart with details
- `src/hooks/useAnalytics.ts` - SWR hook for data fetching

**Features:**
- ✅ Real-time data updates (30s refresh)
- ✅ Interactive Recharts visualizations
- ✅ Time range selector (24h, 7d, 30d)
- ✅ Animated metric cards with trends
- ✅ Error handling and loading states
- ✅ Responsive grid layout
- ✅ Mock data for development/demo

### 🔄 Phase 3: Documentation - READY TO START

**Next Tasks:**
- MDX setup and configuration
- Documentation layout with sidebar
- Core documentation pages
- Code syntax highlighting
- API reference pages

---

## 1. Site Architecture

### 1.1 Page Structure

```
/ (Homepage)
├── /dashboard (Analytics Dashboard)
├── /docs
│   ├── /getting-started
│   ├── /installation
│   ├── /configuration
│   ├── /api-reference
│   ├── /tools
│   │   ├── /get-forecast
│   │   ├── /get-current-conditions
│   │   ├── /get-alerts
│   │   └── /search-location
│   ├── /providers
│   │   ├── /noaa
│   │   └── /open-meteo
│   ├── /privacy
│   ├── /analytics-transparency
│   └── /troubleshooting
├── /examples (Code examples and use cases)
├── /community
│   ├── /contribute
│   └── /showcase
└── /blog (Optional - Future)
```

### 1.2 Next.js App Router Structure

```
src/app/
├── layout.tsx              # Root layout with navigation
├── page.tsx                # Homepage
├── dashboard/
│   ├── layout.tsx          # Dashboard layout
│   ├── page.tsx            # Main dashboard
│   └── loading.tsx         # Loading state
├── docs/
│   ├── layout.tsx          # Docs layout with sidebar
│   ├── page.tsx            # Docs index
│   ├── getting-started/
│   │   └── page.tsx
│   ├── installation/
│   │   └── page.tsx
│   ├── configuration/
│   │   └── page.tsx
│   └── [...slug]/
│       └── page.tsx        # Dynamic docs pages
├── examples/
│   └── page.tsx
├── community/
│   └── page.tsx
└── api/                    # API routes (optional)
    └── revalidate/
        └── route.ts
```

### 1.3 Component Architecture

```
src/components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── Sidebar.tsx
│   └── MobileMenu.tsx
├── home/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── QuickStart.tsx
│   ├── Stats.tsx
│   └── CTA.tsx
├── dashboard/
│   ├── OverviewCard.tsx
│   ├── ToolUsageChart.tsx
│   ├── PerformanceChart.tsx
│   ├── ErrorSummary.tsx
│   ├── GeoDistribution.tsx
│   ├── CacheMetrics.tsx
│   ├── ServiceUsage.tsx
│   ├── TimeRangeSelector.tsx
│   └── MetricCard.tsx
├── docs/
│   ├── DocsSidebar.tsx
│   ├── DocsContent.tsx
│   ├── TableOfContents.tsx
│   ├── CodeBlock.tsx
│   └── Breadcrumbs.tsx
├── common/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Spinner.tsx
│   ├── ErrorBoundary.tsx
│   └── SEO.tsx
└── ui/                     # shadcn/ui components (optional)
```

---

## 2. Homepage Design & Implementation

### 2.1 Hero Section

**Design Goals:**
- Immediate clarity on what Weather MCP does
- Visual appeal with weather-related imagery/animations
- Clear call-to-action
- Trust indicators (GitHub stars, active installations)

**Components:**
```tsx
<Hero>
  <Headline>
    Access Real-World Weather Data in Claude Desktop
  </Headline>
  <Subheadline>
    MCP server providing forecasts, alerts, and current conditions
    from NOAA and Open-Meteo
  </Subheadline>
  <CTAButtons>
    <PrimaryButton href="/docs/getting-started">
      Get Started
    </PrimaryButton>
    <SecondaryButton href="/dashboard">
      View Analytics
    </SecondaryButton>
  </CTAButtons>
  <TrustIndicators>
    <GitHubStars />
    <ActiveInstallations />
    <UptimePercentage />
  </TrustIndicators>
</Hero>
```

**Animations:**
- Fade-in on load
- Subtle background animation (weather particles?)
- Hover effects on buttons
- Counter animations for stats

### 2.2 Features Section

**Key Features to Highlight:**

1. **Multi-Provider Support**
   - Icon: Cloud with multiple sources
   - Description: Automatic fallback between NOAA and Open-Meteo
   - Benefit: 99.9% uptime reliability

2. **Comprehensive Weather Data**
   - Icon: Weather icons
   - Description: Forecasts, alerts, current conditions, marine data
   - Benefit: Everything you need in one place

3. **Privacy-First Analytics**
   - Icon: Shield/Lock
   - Description: Optional, anonymous usage tracking
   - Benefit: Help improve the project without compromising privacy

4. **Easy Integration**
   - Icon: Puzzle piece
   - Description: Simple Claude Desktop configuration
   - Benefit: Up and running in minutes

5. **Open Source**
   - Icon: GitHub logo
   - Description: Fully open source and auditable
   - Benefit: Community-driven development

6. **Location Intelligence**
   - Icon: Map pin
   - Description: Natural language location search
   - Benefit: "Get weather for San Francisco" just works

**Layout:**
```
┌──────────────────────────────────────────┐
│  Features (Grid: 3 columns on desktop)  │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │ Icon   │  │ Icon   │  │ Icon   │    │
│  │ Title  │  │ Title  │  │ Title  │    │
│  │ Desc   │  │ Desc   │  │ Desc   │    │
│  └────────┘  └────────┘  └────────┘    │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │ Icon   │  │ Icon   │  │ Icon   │    │
│  │ Title  │  │ Title  │  │ Title  │    │
│  │ Desc   │  │ Desc   │  │ Desc   │    │
│  └────────┘  └────────┘  └────────┘    │
└──────────────────────────────────────────┘
```

### 2.3 Quick Start Section

**Interactive Installation Guide:**

```tsx
<QuickStart>
  <Steps>
    <Step number={1}>
      <Title>Install the MCP Server</Title>
      <CodeBlock language="bash">
        npm install -g @weather-mcp/server
      </CodeBlock>
    </Step>

    <Step number={2}>
      <Title>Configure Claude Desktop</Title>
      <CodeBlock language="json" copyable>
        {claudeConfigExample}
      </CodeBlock>
      <CopyButton />
    </Step>

    <Step number={3}>
      <Title>Start Using Weather Tools</Title>
      <ExampleQuery>
        "What's the weather forecast for Seattle?"
      </ExampleQuery>
    </Step>
  </Steps>

  <LearnMoreButton href="/docs/getting-started">
    Full Installation Guide →
  </LearnMoreButton>
</QuickStart>
```

### 2.4 Live Statistics Section

**Real-time Project Health:**

```tsx
<StatsSection>
  <StatCard>
    <Label>API Calls (24h)</Label>
    <Value animated>{stats.calls24h}</Value>
    <Trend>{stats.callsTrend}</Trend>
  </StatCard>

  <StatCard>
    <Label>Success Rate</Label>
    <Value>{stats.successRate}%</Value>
    <Sparkline data={stats.successHistory} />
  </StatCard>

  <StatCard>
    <Label>Active Installations</Label>
    <Value animated>{stats.activeInstalls}</Value>
  </StatCard>

  <StatCard>
    <Label>Uptime (30d)</Label>
    <Value>{stats.uptime}%</Value>
  </StatCard>
</StatsSection>
```

**Data Source:** Fetch from analytics API endpoint

### 2.5 Community & Contribution Section

```tsx
<Community>
  <Title>Join the Community</Title>
  <Description>
    Weather MCP is open source and community-driven
  </Description>

  <CommunityLinks>
    <LinkCard href="https://github.com/dgahagan/weather-mcp">
      <GitHubIcon />
      <Title>View on GitHub</Title>
      <Description>Star, fork, and contribute</Description>
    </LinkCard>

    <LinkCard href="/community/showcase">
      <ShowcaseIcon />
      <Title>User Showcase</Title>
      <Description>See what others are building</Description>
    </LinkCard>

    <LinkCard href="/docs/contribute">
      <ContributeIcon />
      <Title>Contributing Guide</Title>
      <Description>Help improve the project</Description>
    </LinkCard>
  </CommunityLinks>
</Community>
```

---

## 3. Analytics Dashboard Implementation

### 3.1 Dashboard Layout

```
┌──────────────────────────────────────────────────────┐
│  Dashboard Header                                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │ Time Range │  │ Auto Refresh │ │ Export     │    │
│  └────────────┘  └────────────┘  └────────────┘    │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Overview Cards (4 across)                           │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │Total │  │Success│  │  Avg │  │Active│           │
│  │Calls │  │ Rate  │  │ Resp │  │Users │           │
│  └──────┘  └──────┘  └──────┘  └──────┘           │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Tool Usage Over Time (Line/Area Chart)              │
│  📊 [Chart showing calls per tool over time]         │
└──────────────────────────────────────────────────────┘

┌────────────────────┐  ┌────────────────────────────┐
│  Performance       │  │  Cache Metrics             │
│  📊 Response times │  │  📊 Hit rate & savings     │
└────────────────────┘  └────────────────────────────┘

┌────────────────────┐  ┌────────────────────────────┐
│  Error Summary     │  │  Service Distribution      │
│  🚨 Error types    │  │  📊 NOAA vs Open-Meteo     │
└────────────────────┘  └────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Geographic Distribution                             │
│  🗺️  World map with country-level data              │
└──────────────────────────────────────────────────────┘
```

### 3.2 Overview Cards Component

```tsx
interface OverviewCardProps {
  title: string;
  value: number | string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  sparkline?: number[];
  format?: 'number' | 'percentage' | 'duration';
}

<OverviewCard
  title="Total API Calls"
  value={stats.totalCalls}
  trend={{ value: 12.5, direction: 'up' }}
  sparkline={last24Hours}
  format="number"
/>
```

**Features:**
- Animated counter on mount
- Trend indicator with percentage change
- Optional sparkline visualization
- Color coding (green for good, red for concerning)
- Tooltip with detailed information

### 3.3 Tool Usage Chart

**Chart Type:** Area chart or stacked area chart

**Data Structure:**
```typescript
interface ToolUsageData {
  timestamp: string;
  get_forecast: number;
  get_current_conditions: number;
  get_alerts: number;
  search_location: number;
  get_historical: number;
}
```

**Features:**
- Interactive tooltips showing exact values
- Legend with tool colors
- Toggle individual tools on/off
- Zoom and pan capabilities
- Responsive design

**Implementation with Recharts:**
```tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

<ToolUsageChart data={usageData} timeRange={selectedRange}>
  <AreaChart data={data}>
    <XAxis dataKey="timestamp" />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />
    <Legend />
    <Area
      type="monotone"
      dataKey="get_forecast"
      stackId="1"
      stroke="#3B82F6"
      fill="#3B82F6"
    />
    <Area
      type="monotone"
      dataKey="get_current_conditions"
      stackId="1"
      stroke="#10B981"
      fill="#10B981"
    />
    {/* ... more areas */}
  </AreaChart>
</ToolUsageChart>
```

### 3.4 Performance Metrics Chart

**Visualization:** Box plot or percentile chart

**Metrics to Display:**
- p50 (median) response time
- p95 response time
- p99 response time
- Average response time
- Min/max response times

**Chart Options:**
- Group by tool
- Compare time periods
- Show only slow requests (> threshold)

```tsx
<PerformanceChart>
  <ChartSelector>
    <Option value="percentiles">Percentiles</Option>
    <Option value="timeline">Over Time</Option>
    <Option value="by-tool">By Tool</Option>
  </ChartSelector>

  <ResponsiveChart>
    {/* Dynamic chart based on selection */}
  </ResponsiveChart>

  <Legend>
    <Item color="blue">p50 (Median)</Item>
    <Item color="yellow">p95</Item>
    <Item color="red">p99</Item>
  </Legend>
</PerformanceChart>
```

### 3.5 Error Summary Component

**Display Format:** Table + Pie Chart

```tsx
<ErrorSummary>
  <ErrorPieChart>
    {/* Shows error type distribution */}
  </ErrorPieChart>

  <ErrorTable>
    <thead>
      <tr>
        <th>Error Type</th>
        <th>Count</th>
        <th>Percentage</th>
        <th>Trend</th>
        <th>Affected Tools</th>
      </tr>
    </thead>
    <tbody>
      {errors.map(error => (
        <tr key={error.type}>
          <td>{error.type}</td>
          <td>{error.count}</td>
          <td>{error.percentage}%</td>
          <td>
            <TrendIndicator value={error.trend} />
          </td>
          <td>
            <ToolBadges tools={error.affectedTools} />
          </td>
        </tr>
      ))}
    </tbody>
  </ErrorTable>
</ErrorSummary>
```

### 3.6 Geographic Distribution Map

**Implementation Options:**

**Option 1: Simple Country List (Phase 1)**
```tsx
<GeoDistribution>
  <CountryList>
    {countries.map(country => (
      <CountryRow key={country.code}>
        <Flag code={country.code} />
        <Name>{country.name}</Name>
        <CallCount>{country.calls}</CallCount>
        <ProgressBar
          percentage={country.calls / totalCalls * 100}
        />
      </CountryRow>
    ))}
  </CountryList>
</GeoDistribution>
```

**Option 2: Interactive Map (Phase 2)**
- Use react-simple-maps or similar
- Choropleth map with color intensity based on usage
- Hover tooltips with detailed stats
- Click to drill down into country details

### 3.7 Cache Metrics

```tsx
<CacheMetrics>
  <MetricCard>
    <Title>Cache Hit Rate</Title>
    <BigValue>{cacheStats.hitRate}%</BigValue>
    <Description>
      Saved {cacheStats.savedRequests.toLocaleString()} API calls
    </Description>
  </MetricCard>

  <CacheTimeline>
    <AreaChart data={cacheHistory}>
      <Area dataKey="hitRate" stroke="#10B981" />
    </AreaChart>
  </CacheTimeline>

  <CacheBreakdown>
    <Title>Cache Performance by Tool</Title>
    <BarChart data={cacheByTool}>
      <Bar dataKey="hitRate" fill="#10B981" />
    </BarChart>
  </CacheBreakdown>
</CacheMetrics>
```

### 3.8 Service Distribution

**Visualization:** Pie chart or stacked bar chart

```tsx
<ServiceUsage>
  <PieChart>
    <Pie
      data={[
        { name: 'NOAA', value: serviceStats.noaa },
        { name: 'Open-Meteo', value: serviceStats.openMeteo },
      ]}
      dataKey="value"
      nameKey="name"
    />
  </PieChart>

  <ServiceDetails>
    <ServiceRow>
      <Icon>🇺🇸</Icon>
      <Name>NOAA</Name>
      <Count>{serviceStats.noaa.toLocaleString()}</Count>
      <Percentage>{serviceStats.noaaPercentage}%</Percentage>
      <SuccessRate>{serviceStats.noaaSuccessRate}%</SuccessRate>
    </ServiceRow>

    <ServiceRow>
      <Icon>🌍</Icon>
      <Name>Open-Meteo</Name>
      <Count>{serviceStats.openMeteo.toLocaleString()}</Count>
      <Percentage>{serviceStats.openMeteoPercentage}%</Percentage>
      <SuccessRate>{serviceStats.openMeteoSuccessRate}%</SuccessRate>
    </ServiceRow>
  </ServiceDetails>
</ServiceUsage>
```

### 3.9 Time Range Selector

```tsx
<TimeRangeSelector
  value={selectedRange}
  onChange={setSelectedRange}
>
  <Option value="24h">Last 24 Hours</Option>
  <Option value="7d">Last 7 Days</Option>
  <Option value="30d">Last 30 Days</Option>
  <Option value="custom">Custom Range</Option>
</TimeRangeSelector>

{selectedRange === 'custom' && (
  <DateRangePicker
    startDate={customStart}
    endDate={customEnd}
    onChange={handleCustomRangeChange}
  />
)}
```

### 3.10 Real-time Updates with SWR

```typescript
// src/hooks/useAnalytics.ts
import useSWR from 'swr';

interface AnalyticsData {
  overview: OverviewStats;
  toolUsage: ToolUsageData[];
  performance: PerformanceMetrics;
  errors: ErrorSummary[];
  cache: CacheStats;
  services: ServiceDistribution;
  geo: GeoDistribution;
}

export function useAnalytics(timeRange: string) {
  const { data, error, isLoading, mutate } = useSWR<AnalyticsData>(
    `/stats/overview?period=${timeRange}`,
    fetcher,
    {
      refreshInterval: 30000, // 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 10000,
    }
  );

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  };
}
```

**Error Handling:**
```tsx
function Dashboard() {
  const { data, error, isLoading } = useAnalytics(timeRange);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Analytics"
        message={error.message}
        retry={() => window.location.reload()}
      />
    );
  }

  return <DashboardContent data={data} />;
}
```

---

## 4. Documentation Section

### 4.1 Documentation Structure

```typescript
// src/content/docs/
interface DocPage {
  slug: string;
  title: string;
  description: string;
  category: 'getting-started' | 'guides' | 'api' | 'tools' | 'providers';
  order: number;
  content: string; // MDX content
  toc: TableOfContentsItem[];
}
```

### 4.2 Documentation Pages (Priority Order)

**Phase 1 - Essential Docs:**

1. **Getting Started** (`/docs/getting-started`)
   - What is Weather MCP?
   - System requirements
   - Quick installation
   - First request example
   - Common issues

2. **Installation** (`/docs/installation`)
   - Detailed installation steps
   - Claude Desktop configuration
   - Environment variables
   - Troubleshooting installation

3. **Configuration** (`/docs/configuration`)
   - Environment variables reference
   - NOAA API token setup
   - Analytics opt-in/opt-out
   - Cache configuration
   - Provider selection

4. **API Reference** (`/docs/api-reference`)
   - Overview of available tools
   - Request/response formats
   - Error codes
   - Rate limits

5. **Tools Reference**
   - `/docs/tools/get-forecast` - Detailed forecast tool docs
   - `/docs/tools/get-current-conditions` - Current conditions
   - `/docs/tools/get-alerts` - Weather alerts
   - `/docs/tools/search-location` - Location search
   - `/docs/tools/get-historical` - Historical data

6. **Privacy & Analytics** (`/docs/privacy`)
   - Privacy policy
   - What analytics collect
   - How to opt-in/opt-out
   - Data retention
   - GDPR/CCPA compliance

**Phase 2 - Advanced Docs:**

7. **Providers** (`/docs/providers/*`)
   - NOAA provider details
   - Open-Meteo provider details
   - Provider selection logic
   - Fallback behavior

8. **Examples** (`/docs/examples/*`)
   - Common use cases
   - Integration examples
   - Best practices
   - Advanced usage

9. **Troubleshooting** (`/docs/troubleshooting`)
   - Common errors and solutions
   - Debug mode
   - Logging
   - Support channels

### 4.3 MDX-Based Documentation

**File Structure:**
```
src/content/docs/
├── getting-started.mdx
├── installation.mdx
├── configuration.mdx
├── api-reference.mdx
├── tools/
│   ├── get-forecast.mdx
│   ├── get-current-conditions.mdx
│   └── get-alerts.mdx
└── privacy.mdx
```

**MDX Features:**
- Code syntax highlighting
- Interactive code examples
- Embedded components
- Automatic table of contents
- Breadcrumb navigation

**Example MDX:**
```mdx
---
title: "Getting Started with Weather MCP"
description: "Quick guide to installing and using Weather MCP"
category: "getting-started"
order: 1
---

# Getting Started

Weather MCP brings real-world weather data to Claude Desktop through the Model Context Protocol.

## Quick Installation

<CodeBlock language="bash">
npm install -g @weather-mcp/server
</CodeBlock>

## Configure Claude Desktop

Add this to your Claude Desktop configuration:

<ConfigExample />

## Your First Request

Try asking Claude:

<ExampleQuery>
What's the weather forecast for Seattle this week?
</ExampleQuery>

<Callout type="info">
Make sure to get a free NOAA API token first!
</Callout>

## Next Steps

- [Full Installation Guide](/docs/installation)
- [Configuration Options](/docs/configuration)
- [API Reference](/docs/api-reference)
```

### 4.4 Documentation Components

```tsx
// src/components/docs/CodeBlock.tsx
<CodeBlock language="typescript" copyable filename="config.json">
  {code}
</CodeBlock>

// src/components/docs/Callout.tsx
<Callout type="info" | "warning" | "error" | "success">
  {children}
</Callout>

// src/components/docs/Tabs.tsx
<Tabs>
  <Tab label="npm">
    <CodeBlock>npm install</CodeBlock>
  </Tab>
  <Tab label="yarn">
    <CodeBlock>yarn add</CodeBlock>
  </Tab>
</Tabs>

// src/components/docs/ApiReference.tsx
<ApiReference>
  <Endpoint method="POST" path="/tools/get-forecast">
    <Description>Get weather forecast for a location</Description>
    <Parameters>
      <Param name="latitude" type="number" required>
        Latitude coordinate
      </Param>
    </Parameters>
    <Response>
      <CodeBlock>{responseExample}</CodeBlock>
    </Response>
  </Endpoint>
</ApiReference>
```

### 4.5 Search Functionality

**Implementation Options:**

**Option 1: Client-side search (Phase 1)**
- Build search index at build time
- Use Fuse.js for fuzzy search
- Instant results, no backend needed

```tsx
import Fuse from 'fuse.js';

const searchIndex = new Fuse(allDocs, {
  keys: ['title', 'description', 'content'],
  threshold: 0.3,
});

function SearchBar() {
  const [query, setQuery] = useState('');
  const results = searchIndex.search(query);

  return (
    <SearchInput
      value={query}
      onChange={e => setQuery(e.target.value)}
      results={results}
    />
  );
}
```

**Option 2: Algolia DocSearch (Phase 2)**
- Professional search experience
- Free for open source projects
- Better relevance and performance

---

## 5. Design System

### 5.1 Color Palette

```typescript
// tailwind.config.js
const colors = {
  // Primary - Blue (trust, technology)
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',  // Main
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Secondary - Green (success, growth)
  secondary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#10B981',  // Main
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Accent - Amber (energy, warmth)
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',  // Main
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Error - Red
  error: {
    500: '#EF4444',
    600: '#DC2626',
  },

  // Neutral - Slate
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};
```

### 5.2 Typography

```typescript
// Font Configuration
const fontFamily = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
};

// Type Scale
const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
};

// Font Weights
const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};
```

### 5.3 Spacing & Layout

```typescript
// Spacing Scale (4px base)
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',      // 4px
  2: '0.5rem',       // 8px
  3: '0.75rem',      // 12px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  8: '2rem',         // 32px
  10: '2.5rem',      // 40px
  12: '3rem',        // 48px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
};

// Container Sizes
const containers = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Breakpoints
const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
```

### 5.4 Component Library

**Core Components:**

1. **Button**
   - Variants: primary, secondary, outline, ghost
   - Sizes: sm, md, lg
   - States: default, hover, active, disabled

2. **Card**
   - With/without border
   - With/without shadow
   - Hover effects

3. **Badge**
   - Colors: primary, secondary, error, success, neutral
   - Sizes: sm, md, lg

4. **Input**
   - Text input
   - Search input
   - With icons
   - Error states

5. **Modal/Dialog**
   - Centered modal
   - Side drawer
   - Confirmation dialogs

6. **Dropdown/Select**
   - Single select
   - Multi-select
   - Searchable

7. **Tooltip**
   - Hover tooltips
   - Click tooltips
   - Positions: top, bottom, left, right

**Example Button Component:**
```tsx
// src/components/common/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors';

  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
    ghost: 'text-primary-500 hover:bg-primary-50',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner size={size} /> : children}
    </button>
  );
}
```

### 5.5 Animations & Transitions

```typescript
// tailwind.config.js - Animation extensions
const animation = {
  'fade-in': 'fadeIn 0.5s ease-in',
  'slide-up': 'slideUp 0.3s ease-out',
  'slide-down': 'slideDown 0.3s ease-out',
  'scale-in': 'scaleIn 0.2s ease-out',
  'spin-slow': 'spin 3s linear infinite',
};

const keyframes = {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideUp: {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideDown: {
    '0%': { transform: 'translateY(-20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  scaleIn: {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
};
```

**Usage:**
```tsx
<div className="animate-fade-in">
  Fades in on mount
</div>

<div className="transition-all duration-300 hover:scale-105">
  Scales on hover
</div>
```

---

## 6. API Client Implementation

### 6.1 Analytics API Client

```typescript
// src/api/analytics.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_ANALYTICS_API;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 5000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `API request failed: ${response.statusText}`
      );
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Analytics Endpoints
export const analyticsApi = {
  async getOverview(period: string): Promise<OverviewStats> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/overview?period=${period}`
    );
    return response.json();
  },

  async getToolStats(
    toolName: string,
    period: string
  ): Promise<ToolStats> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/tool/${toolName}?period=${period}`
    );
    return response.json();
  },

  async getHealthStatus(): Promise<HealthStatus> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/health`
    );
    return response.json();
  },
};

// SWR Fetcher
export const fetcher = async (url: string) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}${url}`);
  return response.json();
};
```

### 6.2 Type Definitions

```typescript
// src/types/analytics.ts
export interface OverviewStats {
  period: string;
  start_date: string;
  end_date: string;
  summary: {
    total_calls: number;
    unique_versions: number;
    active_installs: number;
    success_rate: number;
    avg_response_time_ms: number;
  };
  tools: ToolSummary[];
  errors: ErrorSummary[];
  cache_hit_rate: number;
}

export interface ToolSummary {
  name: string;
  calls: number;
  success_rate: number;
  avg_response_time_ms: number;
}

export interface ErrorSummary {
  type: string;
  count: number;
  percentage: number;
  affected_tools: string[];
}

export interface ToolUsageData {
  timestamp: string;
  [toolName: string]: number | string;
}

export interface PerformanceMetrics {
  by_tool: {
    [toolName: string]: {
      p50: number;
      p95: number;
      p99: number;
      avg: number;
    };
  };
  timeline: {
    timestamp: string;
    p50: number;
    p95: number;
    p99: number;
  }[];
}

export interface CacheStats {
  hit_rate: number;
  total_requests: number;
  cache_hits: number;
  cache_misses: number;
  saved_requests: number;
  by_tool: {
    [toolName: string]: {
      hit_rate: number;
      hits: number;
      misses: number;
    };
  };
}

export interface ServiceDistribution {
  noaa: {
    calls: number;
    percentage: number;
    success_rate: number;
  };
  openMeteo: {
    calls: number;
    percentage: number;
    success_rate: number;
  };
}

export interface GeoDistribution {
  countries: {
    code: string;
    name: string;
    calls: number;
    percentage: number;
  }[];
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'down';
  uptime_seconds: number;
  events_processed_24h: number;
  last_event_received: string;
}
```

---

## 7. SEO & Metadata

### 7.1 Next.js Metadata API

```typescript
// src/app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://weather-mcp.dev'),
  title: {
    default: 'Weather MCP - Real-World Weather Data for Claude Desktop',
    template: '%s | Weather MCP',
  },
  description:
    'MCP server providing weather forecasts, alerts, and current conditions from NOAA and Open-Meteo. Free, open source, and privacy-first.',
  keywords: [
    'weather',
    'MCP',
    'Model Context Protocol',
    'Claude Desktop',
    'NOAA',
    'Open-Meteo',
    'weather API',
    'forecasts',
    'alerts',
  ],
  authors: [{ name: 'Dan Gahagan' }],
  creator: 'Dan Gahagan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://weather-mcp.dev',
    title: 'Weather MCP - Real-World Weather Data for Claude Desktop',
    description:
      'MCP server providing weather forecasts, alerts, and current conditions.',
    siteName: 'Weather MCP',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Weather MCP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather MCP - Real-World Weather Data for Claude Desktop',
    description:
      'MCP server providing weather forecasts, alerts, and current conditions.',
    images: ['/og-image.png'],
    creator: '@dgahagan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
```

### 7.2 Page-Specific Metadata

```typescript
// src/app/dashboard/page.tsx
export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description:
    'Real-time analytics dashboard showing Weather MCP usage statistics, performance metrics, and health status.',
  openGraph: {
    title: 'Weather MCP Analytics Dashboard',
    description:
      'Real-time analytics showing Weather MCP usage and performance.',
    images: ['/og-dashboard.png'],
  },
};

// src/app/docs/getting-started/page.tsx
export const metadata: Metadata = {
  title: 'Getting Started',
  description:
    'Quick guide to installing and using Weather MCP with Claude Desktop. Get up and running in minutes.',
};
```

### 7.3 JSON-LD Structured Data

```tsx
// src/components/common/StructuredData.tsx
export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Weather MCP',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows, macOS, Linux',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
    author: {
      '@type': 'Person',
      name: 'Dan Gahagan',
    },
    description:
      'MCP server providing weather forecasts, alerts, and current conditions from NOAA and Open-Meteo.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### 7.4 Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://weather-mcp.dev';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/getting-started`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // ... more pages
  ];
}
```

### 7.5 robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://weather-mcp.dev/sitemap.xml',
  };
}
```

---

## 8. Performance Optimization

### 8.1 Next.js Configuration

```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    domains: ['weather-mcp.dev', 'analytics.weather-mcp.dev'],
    formats: ['image/avif', 'image/webp'],
  },

  // Compression
  compress: true,

  // Static optimization
  output: 'standalone',

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['recharts', 'lucide-react'],
  },

  // Bundle analyzer (dev only)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      );
      return config;
    },
  }),
};
```

### 8.2 Rendering Strategies

**Static Generation (SSG):**
- Homepage
- Documentation pages
- About/Community pages

```typescript
// Static generation with ISR
export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const data = await fetchStaticData();
  return <PageContent data={data} />;
}
```

**Incremental Static Regeneration (ISR):**
- Dashboard overview (revalidate every 60s)

```typescript
export const revalidate = 60; // Revalidate every minute

export default async function Dashboard() {
  const stats = await fetchDashboardStats();
  return <DashboardContent stats={stats} />;
}
```

**Client-Side Rendering (CSR):**
- Real-time dashboard updates
- Interactive charts
- User-specific content

```typescript
'use client';

export default function RealTimeDashboard() {
  const { data } = useSWR('/stats/overview', fetcher, {
    refreshInterval: 30000,
  });
  return <DashboardContent data={data} />;
}
```

### 8.3 Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const DashboardCharts = dynamic(
  () => import('@/components/dashboard/Charts'),
  {
    loading: () => <ChartsSkeleton />,
    ssr: false, // Client-side only
  }
);

const GeoMap = dynamic(
  () => import('@/components/dashboard/GeoMap'),
  {
    loading: () => <MapSkeleton />,
    ssr: false,
  }
);
```

### 8.4 Asset Optimization

**Images:**
```tsx
import Image from 'next/image';

<Image
  src="/hero-image.png"
  alt="Weather MCP"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL={blurDataURL}
/>
```

**Fonts:**
```typescript
// src/app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});
```

### 8.5 Caching Strategy

**SWR Configuration:**
```typescript
// src/app/layout.tsx
import { SWRConfig } from 'swr';

export default function RootLayout({ children }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 30000,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 10000,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        onError: (error) => {
          console.error('SWR Error:', error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
```

**HTTP Caching:**
```typescript
// API route with caching headers
export async function GET() {
  const data = await fetchData();

  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

### 8.6 Performance Monitoring

```typescript
// src/utils/performance.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Log to analytics
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    console.log(metric);
  }
}

// Core Web Vitals
export function trackCoreWebVitals() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // FCP - First Contentful Paint
    // LCP - Largest Contentful Paint
    // FID - First Input Delay
    // CLS - Cumulative Layout Shift
    // TTFB - Time to First Byte
  }
}
```

---

## 9. Accessibility

### 9.1 WCAG 2.1 AA Compliance

**Key Requirements:**
- ✓ Keyboard navigation
- ✓ Screen reader support
- ✓ Color contrast ratio ≥ 4.5:1
- ✓ Focus indicators
- ✓ Alt text for images
- ✓ Semantic HTML
- ✓ ARIA labels where needed

### 9.2 Semantic HTML

```tsx
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/docs">Docs</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Page Title</h1>
    <section aria-labelledby="section-title">
      <h2 id="section-title">Section Title</h2>
      <p>Content...</p>
    </section>
  </article>
</main>

<footer>
  <p>© 2025 Weather MCP</p>
</footer>
```

### 9.3 Keyboard Navigation

```tsx
// All interactive elements must be keyboard accessible
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  aria-label="Close modal"
>
  <CloseIcon />
</button>

// Skip to main content link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to main content
</a>
```

### 9.4 Screen Reader Support

```tsx
// Live regions for dynamic content
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</div>

// Descriptive labels
<button aria-label="Refresh dashboard data">
  <RefreshIcon aria-hidden="true" />
</button>

// Hidden text for context
<span className="sr-only">
  Current success rate is {successRate}%
</span>
```

### 9.5 Color Contrast

```typescript
// Ensure all text meets WCAG AA standards
const contrastRatios = {
  'text-on-white': 'text-neutral-900',     // 16:1
  'text-on-primary': 'text-white',         // 4.5:1
  'link-default': 'text-primary-600',      // 7:1
  'error-text': 'text-error-600',          // 6:1
};
```

### 9.6 Focus Management

```tsx
// Visible focus indicators
<button className="focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Click me
</button>

// Focus trap in modals
import { FocusTrap } from '@headlessui/react';

<FocusTrap>
  <Modal>
    {/* Modal content */}
  </Modal>
</FocusTrap>
```

---

## 10. Testing Strategy

### 10.1 Unit Tests (Vitest)

```typescript
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary-500');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary-500');
  });
});
```

### 10.2 Integration Tests

```typescript
// src/app/dashboard/page.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import Dashboard from './page';

const mockAnalyticsData = {
  summary: {
    total_calls: 10000,
    success_rate: 0.98,
  },
  // ... more mock data
};

describe('Dashboard', () => {
  it('displays loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays analytics data after loading', async () => {
    const fetcher = () => Promise.resolve(mockAnalyticsData);

    render(
      <SWRConfig value={{ provider: () => new Map(), fetcher }}>
        <Dashboard />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(screen.getByText('10,000')).toBeInTheDocument();
      expect(screen.getByText('98%')).toBeInTheDocument();
    });
  });

  it('displays error state on fetch failure', async () => {
    const fetcher = () => Promise.reject(new Error('API Error'));

    render(
      <SWRConfig value={{ provider: () => new Map(), fetcher }}>
        <Dashboard />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to Load/i)).toBeInTheDocument();
    });
  });
});
```

### 10.3 E2E Tests (Playwright)

```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Weather MCP/);
  });

  test('navigates to dashboard', async ({ page }) => {
    await page.goto('/');
    await page.click('text=View Analytics');
    await expect(page).toHaveURL('/dashboard');
  });

  test('displays hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Weather Data');
  });

  test('has working CTA buttons', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Get Started');
    await expect(page).toHaveURL('/docs/getting-started');
  });
});

// tests/e2e/dashboard.spec.ts
test.describe('Dashboard', () => {
  test('loads analytics data', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for data to load
    await page.waitForSelector('[data-testid="overview-card"]');

    // Check that metrics are displayed
    await expect(page.locator('[data-testid="total-calls"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-rate"]')).toBeVisible();
  });

  test('time range selector works', async ({ page }) => {
    await page.goto('/dashboard');

    await page.click('[data-testid="time-range-selector"]');
    await page.click('text=Last 7 Days');

    // Verify data updates
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="time-range-label"]'))
      .toHaveText('Last 7 Days');
  });

  test('charts render correctly', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.locator('[data-testid="tool-usage-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="performance-chart"]')).toBeVisible();
  });
});
```

### 10.4 Visual Regression Tests

```typescript
// tests/visual/pages.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('homepage matches snapshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
    });
  });

  test('dashboard matches snapshot', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('[data-testid="dashboard-loaded"]');
    await expect(page).toHaveScreenshot('dashboard.png', {
      fullPage: true,
    });
  });

  test('dark mode (if implemented)', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="theme-toggle"]');
    await expect(page).toHaveScreenshot('homepage-dark.png');
  });
});
```

### 10.5 Accessibility Tests

```typescript
// tests/a11y/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('dashboard has no accessibility violations', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('[data-testid="dashboard-loaded"]');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('href', '/docs');

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('href', '/dashboard');
  });
});
```

---

## 11. Deployment

### 11.1 Vercel Deployment (Recommended)

**Benefits:**
- Zero-config Next.js deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs
- Edge functions
- Analytics

**Setup:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Environment Variables (Vercel Dashboard):**
```
NEXT_PUBLIC_ANALYTICS_API=https://analytics.weather-mcp.dev/v1
NEXT_PUBLIC_REFRESH_INTERVAL=30000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 11.2 Self-Hosted Deployment

**Docker Setup:**

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  website:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_ANALYTICS_API=https://analytics.weather-mcp.dev/v1
      - NEXT_PUBLIC_REFRESH_INTERVAL=30000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - website
    restart: unless-stopped
```

### 11.3 Domain Configuration

**DNS Records (weather-mcp.dev):**
```
Type    Name    Value                       TTL
A       @       <vercel-ip>                 Auto
A       www     <vercel-ip>                 Auto
CNAME   www     weather-mcp.dev             Auto
TXT     @       vercel-verification=...     Auto
```

**SSL Certificate:**
- Automatic with Vercel
- Or Let's Encrypt for self-hosted

### 11.4 CI/CD Pipeline

**GitHub Actions:**

```yaml
# .github/workflows/deploy.yml
name: Deploy Website

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_ANALYTICS_API: ${{ secrets.ANALYTICS_API_URL }}

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 12. Monitoring & Analytics

### 12.1 Error Tracking (Sentry)

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 12.2 Web Analytics (Privacy-Friendly)

**Option 1: Plausible Analytics**
```tsx
// src/app/layout.tsx
<script
  defer
  data-domain="weather-mcp.dev"
  src="https://plausible.io/js/script.js"
/>
```

**Option 2: Google Analytics (with consent)**
```tsx
import { GoogleAnalytics } from '@next/third-parties/google';

<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
```

### 12.3 Performance Monitoring

```typescript
// src/utils/monitoring.ts
export function logWebVital(metric: NextWebVitalsMetric) {
  const { name, value, id } = metric;

  // Send to analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }
}
```

### 12.4 Uptime Monitoring

**Services:**
- UptimeRobot (free tier)
- Pingdom
- Better Uptime

**Monitor URLs:**
- https://weather-mcp.dev (homepage)
- https://weather-mcp.dev/dashboard (dashboard)
- https://weather-mcp.dev/api/health (health check)

---

## 13. Implementation Phases

### Phase 1: Foundation (Week 1-2) ✅ COMPLETED
- ✅ Project setup and configuration
- ✅ Design system implementation
- ✅ Layout components (Header, Footer, Navigation)
- ✅ Homepage design and implementation
- ✅ Basic routing structure
- ✅ API client setup

### Phase 2: Dashboard (Week 3-4) ✅ COMPLETED
- ✅ Dashboard layout and structure
- ✅ Overview cards component
- ✅ Tool usage chart
- ✅ Performance metrics chart
- ✅ Error summary component
- ✅ SWR integration for real-time data
- ✅ Time range selector

### Phase 3: Documentation (Week 5-6) 📋 PLANNED
- ⬜ MDX setup and configuration
- ⬜ Documentation layout with sidebar
- ⬜ Core documentation pages
- ⬜ Code syntax highlighting
- ⬜ Search functionality (basic)
- ⬜ Table of contents

### Phase 4: Advanced Features (Week 7-8) 📋 PLANNED
- ⬜ Cache metrics visualization
- ⬜ Service distribution charts
- ⬜ Geographic distribution (list view)
- ⬜ Additional dashboard charts
- ⬜ Examples section
- ⬜ Community pages

### Phase 5: Polish & Testing (Week 9-10) 📋 PLANNED
- ⬜ Comprehensive testing (unit, integration, e2e)
- ⬜ Accessibility audit and fixes
- ⬜ Performance optimization
- ⬜ SEO optimization
- ⬜ Mobile responsiveness
- ⬜ Cross-browser testing

### Phase 6: Deployment (Week 11) 📋 PLANNED
- ⬜ Production environment setup
- ⬜ Domain configuration
- ⬜ SSL certificate
- ⬜ CI/CD pipeline
- ⬜ Monitoring setup
- ⬜ Launch! 🚀

---

## 14. Success Metrics

### 14.1 Performance Metrics
- **Page Load Time**: < 2s (target: 1s)
- **Time to Interactive**: < 3s (target: 2s)
- **Lighthouse Score**: > 90 across all categories
- **Core Web Vitals**:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

### 14.2 User Engagement
- **Bounce Rate**: < 40%
- **Avg Session Duration**: > 2 minutes
- **Pages per Session**: > 2.5
- **Docs Engagement**: > 50% read beyond first page

### 14.3 Technical Metrics
- **Uptime**: > 99.9%
- **Error Rate**: < 0.1%
- **API Response Time**: < 500ms
- **Dashboard Refresh Rate**: 30s

### 14.4 SEO Metrics
- **Organic Traffic Growth**: 20% MoM
- **Keywords Ranking**: Top 10 for "weather MCP"
- **Backlinks**: > 50 within 3 months
- **Domain Authority**: > 30 within 6 months

---

## 15. Future Enhancements

### v1.1 (Month 2-3)
- Interactive geographic map
- Advanced search with Algolia
- Dark mode toggle
- Dashboard data export (CSV, JSON)
- Comparison views (week-over-week, etc.)

### v1.2 (Month 4-5)
- User accounts (optional, for custom dashboards)
- Email notifications for outages
- Blog section for updates
- Community showcase with user submissions
- Multi-language support (i18n)

### v2.0 (Month 6+)
- Real-time WebSocket updates
- Custom dashboard widgets
- API playground/sandbox
- Video tutorials
- Advanced analytics (cohort analysis, funnels)

---

## 16. Open Questions

1. **Color Scheme**: Final decision on primary colors? Current proposal: Blue/Green/Amber
   - Recommendation: Test with users, consider brand identity

2. **Dark Mode**: Include in Phase 1 or defer to v1.1?
   - Recommendation: Defer to v1.1 unless strong user demand

3. **Blog Platform**: Separate CMS or MDX in repo?
   - Recommendation: Start with MDX, migrate to CMS if needed

4. **User Accounts**: Required for v1.0 or defer?
   - Recommendation: Defer to v1.2, focus on public dashboard first

5. **Analytics Provider**: Plausible vs Google Analytics vs self-hosted?
   - Recommendation: Plausible for privacy-first approach

6. **CDN**: Cloudflare vs Vercel Edge?
   - Recommendation: Vercel Edge (included with deployment)

7. **Database**: Need backend database for website?
   - Recommendation: No, all data from analytics API

---

## 17. Risk Assessment

### High Priority Risks

**Risk 1: Analytics API Downtime**
- Impact: Dashboard shows no data
- Mitigation:
  - Implement robust error handling
  - Show cached data as fallback
  - Clear error messages with status page link

**Risk 2: Performance Issues with Large Datasets**
- Impact: Slow dashboard loading
- Mitigation:
  - Implement data pagination
  - Server-side aggregation
  - Efficient chart rendering
  - Loading states and skeletons

**Risk 3: Mobile Responsiveness**
- Impact: Poor mobile UX
- Mitigation:
  - Mobile-first design approach
  - Extensive mobile testing
  - Responsive charts and tables

### Medium Priority Risks

**Risk 4: SEO Not Effective**
- Impact: Low organic traffic
- Mitigation:
  - Comprehensive SEO strategy
  - Quality content
  - Backlink building
  - Regular content updates

**Risk 5: Accessibility Issues**
- Impact: Excluded users, legal concerns
- Mitigation:
  - WCAG 2.1 AA compliance from day 1
  - Automated a11y testing
  - Manual testing with screen readers

### Low Priority Risks

**Risk 6: Browser Compatibility**
- Impact: Broken experience in older browsers
- Mitigation:
  - Target modern browsers only (document support)
  - Graceful degradation
  - Clear browser requirements

---

## 18. Dependencies & Prerequisites

### External Services
- ✓ Analytics API (analytics-server must be deployed first)
- ✓ Domain registration (weather-mcp.dev)
- ✓ Hosting platform account (Vercel or VPS)
- ✓ CDN/DDoS protection (Cloudflare)
- Optional: Sentry, Plausible Analytics

### Development Prerequisites
- Node.js 20+
- npm or pnpm
- Git
- Code editor (VS Code recommended)

### Third-Party Dependencies
```json
{
  "next": "^14.2.4",
  "react": "^18.3.1",
  "recharts": "^2.12.7",
  "swr": "^2.2.5",
  "tailwindcss": "^3.4.4",
  "typescript": "^5.5.2",
  "@headlessui/react": "^2.0.0",
  "lucide-react": "^0.395.0",
  "date-fns": "^3.6.0",
  "zod": "^3.23.8"
}
```

---

## 19. Documentation & Knowledge Transfer

### Internal Documentation
- Architecture decision records (ADRs)
- Component library documentation (Storybook?)
- API integration guide
- Deployment runbook
- Troubleshooting guide

### External Documentation
- User guide (getting started)
- API reference
- Contributing guide
- FAQ
- Video tutorials (future)

---

## Conclusion

This implementation plan provides a comprehensive roadmap for building the Weather MCP website. The phased approach ensures steady progress while maintaining quality and allowing for iteration based on feedback.

**Key Success Factors:**
1. **User-Centric Design**: Focus on clarity and ease of use
2. **Performance First**: Fast load times and smooth interactions
3. **Accessibility**: Inclusive design from day one
4. **Transparency**: Open development and clear documentation
5. **Iterative Approach**: Ship early, gather feedback, improve

**Next Steps:**
1. ✅ ~~Review and approve this plan~~
2. ✅ ~~Set up development environment~~
3. ✅ ~~Begin Phase 1 implementation~~ - COMPLETED
4. 🔄 Continue with Phase 2: Dashboard implementation
5. 📋 Regular progress reviews (weekly)
6. 📋 Continuous deployment to preview environment

**Timeline**: 11 weeks from start to production launch
**Progress**: Week 1-4 completed (Phase 1: Foundation ✅, Phase 2: Dashboard ✅)

---

**Document Version**: 1.2
**Last Updated**: 2025-11-12
**Phase 1 Completed**: 2025-11-12
**Phase 2 Completed**: 2025-11-12
**Review Date**: 2025-11-25 (2 weeks)
**Owner**: Dan Gahagan
