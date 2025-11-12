import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Code examples and use cases for Weather MCP.',
};

export default function Examples() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">
        Examples
      </h1>
      <p className="text-lg text-neutral-600 mb-8">
        Example use cases and integration patterns for Weather MCP
      </p>
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <p className="text-primary-900">
          Example documentation is coming soon!
        </p>
      </div>
    </div>
  );
}
