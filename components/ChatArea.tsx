import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, StopCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Message } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatAreaProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  placeholder?: string;
  initialContext?: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, setMessages, placeholder = "Ask anything about DSA or CS...", initialContext }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Initial Context (e.g., if switching from a specific topic)
  useEffect(() => {
    if (initialContext && !initializedRef.current && messages.length === 0) {
      initializedRef.current = true;
      handleSend(initialContext);
    }
  }, [initialContext]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botMsgId = (Date.now() + 1).toString();
    const botMsg: Message = {
      id: botMsgId,
      role: 'model',
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    };

    setMessages(prev => [...prev, botMsg]);

    try {
      await sendMessageToGemini(text, (streamedText) => {
        setMessages(prev => prev.map(m => 
          m.id === botMsgId ? { ...m, content: streamedText } : m
        ));
      });
    } catch (err) {
      // Error handling managed in service, but we can update UI here if needed
    } finally {
      setIsLoading(false);
      setMessages(prev => prev.map(m => 
        m.id === botMsgId ? { ...m, isStreaming: false } : m
      ));
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
             <Sparkles size={48} className="mb-4 text-indigo-500" />
             <p className="text-xl font-medium">How can I help you master DSA today?</p>
             <p className="text-sm">Try asking about "Time Complexity of QuickSort" or "Explain Semaphores"</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}
            `}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`
              max-w-[85%] rounded-2xl px-5 py-3 
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-sm' 
                : 'bg-slate-800 border border-slate-700 rounded-tl-sm shadow-sm min-w-[300px]'}
            `}>
              {msg.role === 'user' ? (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              ) : (
                <MarkdownRenderer content={msg.content} />
              )}
              {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-indigo-400 animate-pulse" />}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full bg-slate-800 text-slate-200 rounded-xl pl-4 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 resize-none min-h-[60px] max-h-[120px]"
            rows={1}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2">
          Gemini 2.5 Flash may produce accurate but sometimes varying responses. Verify critical information.
        </p>
      </div>
    </div>
  );
};

export default ChatArea;
