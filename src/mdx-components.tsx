import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

// Custom components for MDX content
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children, id }) => (
      <h1
        id={id}
        className="text-4xl font-bold mb-6 mt-8 text-neutral-900 scroll-mt-20"
      >
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2
        id={id}
        className="text-3xl font-bold mb-4 mt-8 text-neutral-900 scroll-mt-20 border-b border-neutral-200 pb-2"
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id}
        className="text-2xl font-semibold mb-3 mt-6 text-neutral-900 scroll-mt-20"
      >
        {children}
      </h3>
    ),
    h4: ({ children, id }) => (
      <h4
        id={id}
        className="text-xl font-semibold mb-2 mt-4 text-neutral-900 scroll-mt-20"
      >
        {children}
      </h4>
    ),

    // Paragraphs and text
    p: ({ children }) => (
      <p className="mb-4 text-neutral-700 leading-relaxed">{children}</p>
    ),

    // Links
    a: ({ href, children }) => {
      const isExternal = href?.startsWith('http');
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 underline decoration-primary-300 hover:decoration-primary-500 transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href || '#'}
          className="text-primary-600 hover:text-primary-700 underline decoration-primary-300 hover:decoration-primary-500 transition-colors"
        >
          {children}
        </Link>
      );
    },

    // Lists
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-neutral-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-neutral-700">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Code blocks
    pre: ({ children }) => (
      <pre className="mb-4 p-4 bg-neutral-900 rounded-lg overflow-x-auto border border-neutral-800">
        {children}
      </pre>
    ),
    code: ({ children, className }) => {
      // Inline code
      if (!className) {
        return (
          <code className="px-1.5 py-0.5 bg-neutral-100 text-neutral-900 rounded text-sm font-mono border border-neutral-200">
            {children}
          </code>
        );
      }
      // Code block (handled by pre)
      return <code className={className}>{children}</code>;
    },

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="mb-4 pl-4 border-l-4 border-primary-500 bg-primary-50 py-2 pr-4 rounded-r">
        <div className="text-neutral-700 italic">{children}</div>
      </blockquote>
    ),

    // Tables
    table: ({ children }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 border border-neutral-200">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-neutral-50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-white divide-y divide-neutral-200">{children}</tbody>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-neutral-700">{children}</td>
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-neutral-200" />,

    // Strong/Bold
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),

    // Emphasis/Italic
    em: ({ children }) => <em className="italic">{children}</em>,

    ...components,
  };
}
