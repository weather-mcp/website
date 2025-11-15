import type { Metadata } from 'next';
import { Card } from '@/components/common/Card';
import { Github, MessageCircle, Users, Heart, Code, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the Weather MCP community and contribute to the project.',
};

export default function Community() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Join the Community
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Weather MCP is open source and community-driven. Connect with other users,
            share your projects, and help make Weather MCP better for everyone.
          </p>
        </div>

        {/* Community Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <a
            href="https://github.com/dgahagan/weather-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card hover padding="lg" className="h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-900 dark:bg-neutral-100 rounded-lg">
                  <Github className="w-8 h-8 text-white dark:text-neutral-900" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    GitHub Repository
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                    Star the project, report issues, and contribute code
                  </p>
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    Visit Repository →
                  </span>
                </div>
              </div>
            </Card>
          </a>

          <a
            href="https://github.com/dgahagan/weather-mcp/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card hover padding="lg" className="h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-600 dark:bg-primary-700 rounded-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Discussions
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                    Ask questions, share ideas, and connect with other users
                  </p>
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    Join Discussion →
                  </span>
                </div>
              </div>
            </Card>
          </a>
        </div>

        {/* Contributing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center">
            How to Contribute
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="lg">
              <div className="text-center">
                <div className="inline-flex p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                  <Code className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Code Contributions
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Fix bugs, add features, improve documentation, or optimize performance
                </p>
                <a
                  href="https://github.com/dgahagan/weather-mcp/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Contributing Guide →
                </a>
              </div>
            </Card>

            <Card padding="lg">
              <div className="text-center">
                <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Documentation
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Help improve docs, write tutorials, or translate content
                </p>
                <a
                  href="https://github.com/dgahagan/weather-mcp/tree/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Docs Repository →
                </a>
              </div>
            </Card>

            <Card padding="lg">
              <div className="text-center">
                <div className="inline-flex p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                  <Users className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Community Support
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Answer questions, help newcomers, and share your expertise
                </p>
                <a
                  href="https://github.com/dgahagan/weather-mcp/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Help Others →
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Ways to Help */}
        <div className="mb-16 bg-primary-50 dark:bg-neutral-800/50 border border-primary-200 dark:border-neutral-700 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Ways to Help the Project
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <span className="text-2xl">⭐</span> Star on GitHub
              </h3>
              <p className="text-neutral-700 dark:text-neutral-200">
                Stars help increase visibility and show appreciation for the project.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <span className="text-2xl">🐛</span> Report Bugs
              </h3>
              <p className="text-neutral-700 dark:text-neutral-200">
                Found a bug? Report it on GitHub Issues with detailed reproduction steps.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span> Suggest Features
              </h3>
              <p className="text-neutral-700 dark:text-neutral-200">
                Have an idea for improvement? Open a feature request or discussion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <span className="text-2xl">📝</span> Share Your Story
              </h3>
              <p className="text-neutral-700 dark:text-neutral-200">
                Blog about your experience or share how you're using Weather MCP.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/dgahagan/weather-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
          >
            <Github className="w-5 h-5" />
            Star on GitHub
          </a>
        </div>

        {/* Code of Conduct */}
        <div className="mb-16">
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg flex-shrink-0">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  Code of Conduct
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  Weather MCP is committed to providing a welcoming and inclusive environment for everyone.
                  We expect all community members to:
                </p>
                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mt-1">•</span>
                    <span>Be respectful and considerate of others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mt-1">•</span>
                    <span>Welcome newcomers and help them learn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mt-1">•</span>
                    <span>Provide constructive feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mt-1">•</span>
                    <span>Focus on what's best for the community</span>
                  </li>
                </ul>
                <a
                  href="https://github.com/dgahagan/weather-mcp/blob/main/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Read Full Code of Conduct →
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Contributors */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Built by the Community
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Weather MCP is made possible by contributors around the world
          </p>
          <a
            href="https://github.com/dgahagan/weather-mcp/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            <Users className="w-5 h-5" />
            View All Contributors
          </a>
        </div>
      </div>
    </div>
  );
}
