'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mb-4">
      {filename && (
        <div className="bg-neutral-800 text-neutral-300 text-sm px-4 py-2 rounded-t-lg border-b border-neutral-700 font-mono">
          {filename}
        </div>
      )}
      <div className="relative">
        <pre
          className={`p-4 bg-neutral-900 overflow-x-auto border border-neutral-800 ${
            filename ? 'rounded-b-lg' : 'rounded-lg'
          }`}
        >
          <code className={language ? `language-${language}` : ''}>
            {children}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-300" />
          )}
        </button>
      </div>
    </div>
  );
}
