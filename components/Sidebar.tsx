import React from 'react';
import { BookOpen, MessageSquare, Award, Terminal, Database, Cpu, LayoutGrid, CheckCircle, LayoutDashboard } from 'lucide-react';
import { AppMode, Topic, TopicCategory } from '../types';
import { DSA_TOPICS, CS_TOPICS } from '../constants';

interface SidebarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  currentTopicId: string | null;
  setTopic: (id: string) => void;
  completedTopicIds: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, setMode, currentTopicId, setTopic, completedTopicIds }) => {
  
  const renderTopicList = (topics: Topic[]) => (
    <div className="space-y-1 mt-2">
      {topics.map(topic => {
        const isCompleted = completedTopicIds.includes(topic.id);
        const isActive = currentTopicId === topic.id && currentMode === AppMode.CURRICULUM;
        
        return (
          <button
            key={topic.id}
            onClick={() => {
              setMode(AppMode.CURRICULUM);
              setTopic(topic.id);
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors
              ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
            `}
          >
            <span className="truncate">{topic.title}</span>
            {isCompleted && <CheckCircle size={14} className="text-emerald-500" />}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Terminal size={20} className="text-white" />
        </div>
        <h1 className="font-bold text-lg tracking-tight text-white">AlgoMaster AI</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Main Navigation */}
        <div className="space-y-1">
          <button 
            onClick={() => setMode(AppMode.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${currentMode === AppMode.DASHBOARD ? 'bg-indigo-600/20 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setMode(AppMode.CHAT)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${currentMode === AppMode.CHAT ? 'bg-indigo-600/20 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <MessageSquare size={18} />
            <span>Mentor Chat</span>
          </button>
          <button 
             onClick={() => setMode(AppMode.MOCK_INTERVIEW)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${currentMode === AppMode.MOCK_INTERVIEW ? 'bg-indigo-600/20 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Award size={18} />
            <span>Mock Interview</span>
          </button>
        </div>

        {/* DSA Section */}
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <LayoutGrid size={14} />
            <span>Data Structures</span>
          </div>
          {renderTopicList(DSA_TOPICS)}
        </div>

        {/* CS Fundamentals Section */}
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu size={14} />
            <span>CS Fundamentals</span>
          </div>
          {renderTopicList(CS_TOPICS)}
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        Powered by Gemini 2.5 Flash
      </div>
    </div>
  );
};

export default Sidebar;