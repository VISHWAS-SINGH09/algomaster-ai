import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none prose-pre:bg-[#1e293b] prose-pre:p-0">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="my-4 rounded-md border border-slate-700 overflow-hidden bg-slate-800">
                <div className="bg-slate-900/50 px-4 py-1 text-xs text-slate-400 font-mono border-b border-slate-700 flex justify-between">
                  <span>{match[1]}</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <code className={`text-sm font-mono text-slate-200`} {...props}>
                    {children}
                  </code>
                </div>
              </div>
            ) : (
              <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-2" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-indigo-400 mt-8 mb-4" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-emerald-400 mt-6 mb-3" {...props} />,
          p: ({ node, ...props }) => <p className="text-slate-300 leading-7 mb-4" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2" {...props} />,
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-400 my-4" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;