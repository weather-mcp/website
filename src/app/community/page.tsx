import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the Weather MCP community.',
};

export default function Community() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">
        Community
      </h1>
      <p className="text-lg text-neutral-600 mb-8">
        Connect with other Weather MCP users and contributors
      </p>
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <p className="text-primary-900">
          Community resources coming soon!
        </p>
      </div>
    </div>
  );
}
