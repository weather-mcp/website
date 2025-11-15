'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import { TimeRangeSelector, type TimeRange } from '@/components/dashboard/TimeRangeSelector';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ToolUsageChart } from '@/components/dashboard/ToolUsageChart';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { ErrorSummary } from '@/components/dashboard/ErrorSummary';
import { CacheMetrics } from '@/components/dashboard/CacheMetrics';
import { ServiceDistribution } from '@/components/dashboard/ServiceDistribution';
import { Spinner } from '@/components/common/Spinner';
import { useAnalytics } from '@/hooks/useAnalytics';

// Mock data for development
const mockErrors = [
  {
    type: 'Rate Limit Exceeded',
    count: 23,
    percentage: 2.8,
    affected_tools: ['get_forecast', 'get_current_conditions'],
  },
  {
    type: 'Invalid Location',
    count: 12,
    percentage: 1.5,
    affected_tools: ['search_location'],
  },
];

const mockData = {
  overview: {
    period: '24h',
    start_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date().toISOString(),
    summary: {
      total_calls: 12451,
      unique_versions: 47,
      active_installs: 247,
      success_rate: 0.992,
      avg_response_time_ms: 234,
    },
    tools: [],
    errors: mockErrors,
    cache_hit_rate: 0.847,
  },
  toolUsage: [
    {
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      get_forecast: 1200,
      get_current_conditions: 800,
      get_alerts: 300,
      search_location: 400,
      get_historical: 100,
    },
    {
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      get_forecast: 1400,
      get_current_conditions: 900,
      get_alerts: 350,
      search_location: 450,
      get_historical: 120,
    },
    {
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      get_forecast: 1600,
      get_current_conditions: 1100,
      get_alerts: 400,
      search_location: 500,
      get_historical: 150,
    },
    {
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      get_forecast: 1800,
      get_current_conditions: 1200,
      get_alerts: 450,
      search_location: 550,
      get_historical: 180,
    },
    {
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      get_forecast: 2000,
      get_current_conditions: 1400,
      get_alerts: 500,
      search_location: 600,
      get_historical: 200,
    },
    {
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      get_forecast: 2200,
      get_current_conditions: 1500,
      get_alerts: 550,
      search_location: 650,
      get_historical: 220,
    },
    {
      timestamp: new Date().toISOString(),
      get_forecast: 2400,
      get_current_conditions: 1600,
      get_alerts: 600,
      search_location: 700,
      get_historical: 250,
    },
  ],
  performance: {
    by_tool: {},
    timeline: [
      {
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        p50: 180,
        p95: 450,
        p99: 890,
      },
      {
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        p50: 175,
        p95: 430,
        p99: 850,
      },
      {
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        p50: 190,
        p95: 470,
        p99: 920,
      },
      {
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        p50: 185,
        p95: 445,
        p99: 880,
      },
      {
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        p50: 195,
        p95: 480,
        p99: 940,
      },
      {
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        p50: 200,
        p95: 490,
        p99: 960,
      },
      {
        timestamp: new Date().toISOString(),
        p50: 205,
        p95: 500,
        p99: 980,
      },
    ],
  },
  errors: mockErrors,
  cache: {
    hit_rate: 84.7,
    total_requests: 12451,
    cache_hits: 10546,
    cache_misses: 1905,
    saved_requests: 10546,
    by_tool: {
      get_forecast: { hit_rate: 92.3, hits: 8800, misses: 734 },
      get_current_conditions: { hit_rate: 78.5, hits: 1256, misses: 344 },
      get_alerts: { hit_rate: 65.2, hits: 391, misses: 209 },
      search_location: { hit_rate: 88.9, hits: 711, misses: 89 },
      get_historical: { hit_rate: 95.6, hits: 388, misses: 18 },
    },
  },
  services: {
    noaa: {
      calls: 8970,
      percentage: 72.0,
      success_rate: 0.994,
    },
    openMeteo: {
      calls: 3481,
      percentage: 28.0,
      success_rate: 0.987,
    },
  },
  geo: {
    countries: [],
  },
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');

  // In development, use mock data. In production, this would fetch from the API
  const { data, error, isLoading } = useAnalytics(timeRange, {
    refreshInterval: 30000,
  });

  // Track whether we're using mock data
  const usingMockData = !data;

  // Use mock data for now
  const displayData = data || mockData;

  if (isLoading && !displayData) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-error-900 dark:text-error-100 mb-2">
            Failed to Load Analytics
          </h2>
          <p className="text-error-700 dark:text-error-200">
            Unable to fetch analytics data. The analytics API may be unavailable.
          </p>
          <p className="text-sm text-error-600 dark:text-error-300 mt-2">
            Showing mock data for demonstration purposes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="dashboard-loaded">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Analytics Dashboard</h1>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            Real-time insights into Weather MCP usage and performance
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>
      </div>

      {/* Mock Data Warning Banner */}
      {usingMockData && !error && (
        <div className="mb-8 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-warning-600 dark:text-warning-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-warning-900 dark:text-warning-100">Displaying Mock Data</h3>
              <p className="text-sm text-warning-700 dark:text-warning-200 mt-1">
                The analytics API is unavailable or returned no data. Showing demonstration data for preview purposes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total API Calls"
          value={displayData.overview.summary.total_calls.toLocaleString()}
          trend={{ value: 12.5, direction: 'up' }}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <MetricCard
          title="Success Rate"
          value={`${(displayData.overview.summary.success_rate * 100).toFixed(1)}%`}
          trend={{ value: 0.3, direction: 'up' }}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          title="Avg Response Time"
          value={`${displayData.overview.summary.avg_response_time_ms}ms`}
          trend={{ value: 2.1, direction: 'down' }}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <MetricCard
          title="Active Installations"
          value={displayData.overview.summary.active_installs.toLocaleString()}
          trend={{ value: 18.0, direction: 'up' }}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
      </div>

      {/* Tool Usage Chart */}
      <div className="mb-8">
        <ToolUsageChart data={displayData.toolUsage} />
      </div>

      {/* Performance and Cache Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PerformanceChart data={displayData.performance} />
        <CacheMetrics stats={displayData.cache} />
      </div>

      {/* Error Summary and Service Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorSummary errors={displayData.errors} />
        <ServiceDistribution distribution={displayData.services} />
      </div>
    </div>
  );
}
