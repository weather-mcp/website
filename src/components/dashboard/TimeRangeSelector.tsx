'use client';

import React from 'react';

export type TimeRange = '1h' | '24h' | '7d' | '30d';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: '1h', label: 'Last Hour' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
];

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Time Range:</span>
      <div className="inline-flex rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-1">
        {ranges.map((range) => (
          <button
            key={range.value}
            onClick={() => onChange(range.value)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md transition-colors
              ${
                value === range.value
                  ? 'bg-primary-500 text-white'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700'
              }
            `}
            data-testid="time-range-option"
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}
