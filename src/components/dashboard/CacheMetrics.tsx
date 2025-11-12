'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import type { CacheStats } from '@/types/analytics';

interface CacheMetricsProps {
  stats: CacheStats;
}

export function CacheMetrics({ stats }: CacheMetricsProps) {
  if (!stats) {
    return (
      <Card padding="md">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Cache Performance
        </h3>
        <div className="h-32 flex items-center justify-center text-neutral-500">
          No data available
        </div>
      </Card>
    );
  }

  const tools = Object.entries(stats.by_tool || {});

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
        Cache Performance
      </h3>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-secondary-50 rounded-lg">
          <div className="text-3xl font-bold text-secondary-600">
            {stats.hit_rate.toFixed(1)}%
          </div>
          <div className="text-sm text-neutral-600 mt-1">Hit Rate</div>
        </div>
        <div className="text-center p-4 bg-primary-50 rounded-lg">
          <div className="text-3xl font-bold text-primary-600">
            {stats.saved_requests.toLocaleString()}
          </div>
          <div className="text-sm text-neutral-600 mt-1">Saved Requests</div>
        </div>
      </div>

      {/* By Tool Breakdown */}
      {tools.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-neutral-700">By Tool</h4>
          {tools.map(([toolName, toolStats]) => (
            <div key={toolName} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-700">
                  {toolName.replace(/_/g, ' ')}
                </span>
                <span className="font-medium text-neutral-900">
                  {toolStats.hit_rate.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-secondary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${toolStats.hit_rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
