'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/common/Card';
import type { ServiceDistribution as ServiceDistributionType } from '@/types/analytics';

interface ServiceDistributionProps {
  distribution: ServiceDistributionType;
}

const COLORS = {
  noaa: '#3B82F6',
  openMeteo: '#10B981',
};

export function ServiceDistribution({ distribution }: ServiceDistributionProps) {
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

  if (!distribution) {
    return (
      <Card padding="md">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Service Distribution
        </h3>
        <div className="h-64 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
          No data available
        </div>
      </Card>
    );
  }

  const chartData = [
    { name: 'NOAA', value: distribution.noaa.calls, percentage: distribution.noaa.percentage },
    { name: 'Open-Meteo', value: distribution.openMeteo.calls, percentage: distribution.openMeteo.percentage },
  ];

  const tooltipBg = isDark ? '#262626' : '#fff';
  const tooltipBorder = isDark ? '#404040' : '#E2E8F0';
  const labelColor = isDark ? '#E5E5E5' : '#000000';

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Service Distribution
      </h3>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            style={{ fill: labelColor }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? COLORS.noaa : COLORS.openMeteo}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => value.toLocaleString()}
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Service Details */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <span className="font-medium text-neutral-900 dark:text-neutral-100">NOAA</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {distribution.noaa.calls.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {(distribution.noaa.success_rate * 100).toFixed(1)}% success rate
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary-500" />
            <span className="font-medium text-neutral-900 dark:text-neutral-100">Open-Meteo</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {distribution.openMeteo.calls.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {(distribution.openMeteo.success_rate * 100).toFixed(1)}% success rate
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
