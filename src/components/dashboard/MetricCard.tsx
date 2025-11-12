'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/common/Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  format?: 'number' | 'percentage' | 'duration';
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, trend, icon }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Animate counter
    const stringValue = String(value);
    setDisplayValue(stringValue);
  }, [value]);

  const getTrendIcon = () => {
    if (!trend) return null;

    if (trend.direction === 'up') {
      return (
        <svg
          className="h-4 w-4 text-secondary-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      );
    }

    if (trend.direction === 'down') {
      return (
        <svg
          className="h-4 w-4 text-error-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          />
        </svg>
      );
    }

    return (
      <svg
        className="h-4 w-4 text-neutral-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14"
        />
      </svg>
    );
  };

  return (
    <Card hover padding="md" data-testid="overview-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p
            className={`mt-2 text-3xl font-bold text-neutral-900 transition-all duration-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {displayValue}
          </p>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              {getTrendIcon()}
              <span
                className={`text-sm font-medium ${
                  trend.direction === 'up'
                    ? 'text-secondary-600'
                    : trend.direction === 'down'
                    ? 'text-error-600'
                    : 'text-neutral-600'
                }`}
              >
                {trend.direction === 'up' ? '+' : ''}
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 rounded-lg bg-primary-50 p-3 text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
