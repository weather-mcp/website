'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { ErrorSummary as ErrorSummaryType } from '@/types/analytics';

interface ErrorSummaryProps {
  errors: ErrorSummaryType[];
}

export function ErrorSummary({ errors }: ErrorSummaryProps) {
  if (!errors || errors.length === 0) {
    return (
      <Card padding="md">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Error Summary
        </h3>
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 mb-3">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-neutral-600">No errors in this time period</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
        Error Summary
      </h3>
      <div className="space-y-3">
        {errors.map((error) => (
          <div
            key={error.type}
            className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-neutral-900">{error.type}</span>
                <Badge variant="error" size="sm">
                  {error.count}
                </Badge>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {error.affected_tools.map((tool) => (
                  <Badge key={tool} variant="neutral" size="sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="ml-4 text-right">
              <div className="text-lg font-semibold text-error-600">
                {error.percentage.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
