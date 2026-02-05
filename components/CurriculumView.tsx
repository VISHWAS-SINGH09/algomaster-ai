import React, { useEffect, useState, useCallback } from 'react';
import { Topic } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { generateTopicContent } from '../services/geminiService';
import { BookOpen, CheckCircle, Loader2, ArrowRight, RefreshCw } from 'lucide-react';

interface CurriculumViewProps {
  topic: Topic;
  onComplete: (id: string) => void;
  isCompleted: boolean;
  switchToChat: (context: string) => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ topic, onComplete, isCompleted, switchToChat }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setContent(null);
    try {
        const generated = await generateTopicContent(topic.title);
        setContent(generated);
    } catch (e) {
        setContent("Failed to load content. Please try again.");
    } finally {
        setLoading(false);
    }
  }, [topic.title]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-y-auto">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4 text-indigo-400">
            <BookOpen size={20} />
            <span className="font-medium tracking-wide uppercase text-xs">{topic.category}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{topic.title}</h1>
          <p className="text-xl text-slate-400 leading-relaxed">{topic.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={48} className="text-indigo-500 animate-spin mb-4" />
              <p className="text-slate-400">Generating expert lesson plan for <span className="text-white font-semibold">{topic.title}</span>...</p>
              <p className="text-slate-600 text-sm mt-2">Crafting personalized content using Gemini 3 Pro.</p>
            </div>
          ) : (
            <>
              <div className="bg-slate-900/50 rounded-xl mb-12 min-h-[200px]">
                {content ? <MarkdownRenderer content={content} /> : (
                    <div className="text-center py-10 text-slate-500">
                        <p>No content available.</p>
                        <button onClick={fetchContent} className="mt-4 px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 text-white flex items-center gap-2 mx-auto">
                             <RefreshCw size={16} /> Retry
                        </button>
                    </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="border-t border-slate-800 pt-8 flex items-center justify-between">
                 <button
                  onClick={() => switchToChat(`I have a doubt about ${topic.title}. Can you explain...`)}
                  className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  Need specific help? Ask Mentor
                </button>
                
                <button
                  onClick={() => onComplete(topic.id)}
                  disabled={isCompleted}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
                    ${isCompleted 
                      ? 'bg-emerald-500/10 text-emerald-500 cursor-default' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/20'}
                  `}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={20} />
                      Completed
                    </>
                  ) : (
                    <>
                      Mark as Complete
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurriculumView;