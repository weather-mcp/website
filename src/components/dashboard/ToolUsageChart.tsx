'use client';

import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/common/Card';
import type { ToolUsageData } from '@/types/analytics';

interface ToolUsageChartProps {
  data: ToolUsageData[];
}

const toolColors = {
  get_forecast: '#3B82F6',
  get_current_conditions: '#10B981',
  get_alerts: '#F59E0B',
  search_location: '#8B5CF6',
  get_historical: '#EC4899',
};

export function ToolUsageChart({ data }: ToolUsageChartProps) {
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

  if (!data || data.length === 0) {
    return (
      <Card padding="md">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Tool Usage Over Time
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
    <Card padding="md" data-testid="tool-usage-chart">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Tool Usage Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            {Object.entries(toolColors).map(([key, color]) => (
              <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="timestamp"
            tick={{ fill: textColor, fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
          />
          <YAxis tick={{ fill: textColor, fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          {Object.entries(toolColors).map(([key, color]) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={color}
              fill={`url(#color${key})`}
              name={key.replace(/_/g, ' ')}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
