import React, { useState } from 'react';
import { Play, Terminal, Loader2, Copy, Check } from 'lucide-react';
import { analyzeCode } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(`# Python implementation of Binary Search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# Test
arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23
result = binary_search(arr, target)
print(f"Element found at index: {result}")`);
  
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
      const result = await analyzeCode(code);
      setOutput(result);
    } catch (e) {
      setOutput("Error executing code analysis.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      
      setCode(value.substring(0, start) + '    ' + value.substring(end));
      
      // We need to defer setting selection range to after render
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const lineNumbers = code.split('\n').map((_, i) => i + 1).join('\n');

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Toolbar */}
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2 text-slate-300">
          <Terminal size={16} className="text-emerald-400" />
          <span className="text-sm font-medium font-mono">AI Code Playground</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
            Run / Analyze
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[400px]">
        {/* Input */}
        <div className="flex-1 relative bg-[#0f172a] flex overflow-hidden group">
          {/* Line Numbers */}
          <div className="w-10 py-4 text-right pr-3 text-slate-600 font-mono text-sm select-none bg-slate-900/50 border-r border-slate-800 leading-6">
            <pre>{lineNumbers}</pre>
          </div>
          {/* Text Area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-slate-200 font-mono text-sm p-4 outline-none resize-none leading-6 whitespace-pre"
            spellCheck="false"
          />
        </div>

        {/* Output Panel */}
        <div className={`md:w-1/3 bg-slate-800 border-t md:border-t-0 md:border-l border-slate-700 flex flex-col ${output ? 'flex' : 'hidden md:flex'}`}>
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Output / Analysis
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-sm text-slate-300 font-mono">
            {output ? (
              <MarkdownRenderer content={output} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                <Play size={32} className="mb-2" />
                <p>Run code to see AI analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;