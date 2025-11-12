import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import Link from 'next/link';

interface ExampleCardProps {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tools: string[];
  code: string;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
};

export function ExampleCard({
  title,
  description,
  category,
  difficulty,
  tools,
  code,
}: ExampleCardProps) {
  return (
    <Card padding="md" className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
        <Badge className={difficultyColors[difficulty]}>
          {difficulty}
        </Badge>
      </div>

      <p className="text-neutral-600 mb-4">{description}</p>

      <div className="mb-4">
        <span className="text-sm font-medium text-neutral-700">Tools used:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {tools.map((tool) => (
            <Badge key={tool} variant="neutral">
              {tool}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <details className="group">
          <summary className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2">
            <span>View Code</span>
            <svg
              className="w-4 h-4 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <pre className="mt-3 p-4 bg-neutral-900 text-neutral-100 rounded-lg overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
        </details>
      </div>
    </Card>
  );
}
