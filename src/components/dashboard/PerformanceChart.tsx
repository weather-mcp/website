'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/common/Card';
import type { PerformanceMetrics } from '@/types/analytics';

interface PerformanceChartProps {
  data: PerformanceMetrics;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for changes to dark mode
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  if (!data || !data.timeline || data.timeline.length === 0) {
    return (
      <Card padding="md">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Response Time Percentiles
        </h3>
        <div className="h-64 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
          No data available
        </div>
      </Card>
    );
  }

  const gridColor = isDark ? '#404040' : '#E2E8F0';
  const textColor = isDark ? '#A3A3A3' : '#64748B';
  const tooltipBg = isDark ? '#262626' : '#fff';
  const tooltipBorder = isDark ? '#404040' : '#E2E8F0';

  return (
    <Card padding="md" data-testid="performance-chart">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Response Time Percentiles
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.timeline}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="timestamp"
            tick={{ fill: textColor, fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
          />
          <YAxis
            tick={{ fill: textColor, fontSize: 12 }}
            label={{ value: 'ms', angle: -90, position: 'insideLeft', fill: textColor }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => `${value}ms`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="p50"
            stroke="#3B82F6"
            strokeWidth={2}
            name="p50 (Median)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="p95"
            stroke="#F59E0B"
            strokeWidth={2}
            name="p95"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="p99"
            stroke="#EF4444"
            strokeWidth={2}
            name="p99"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
