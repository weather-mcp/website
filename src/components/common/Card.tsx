import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  'data-testid'?: string;
}

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  'data-testid': dataTestId,
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      data-testid={dataTestId}
      className={`
        bg-white rounded-lg border border-neutral-200 shadow-sm
        ${hover ? 'transition-shadow duration-200 hover:shadow-md' : ''}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
