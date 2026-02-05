import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import CurriculumView from './components/CurriculumView';
import DashboardView from './components/DashboardView';
import { AppMode, Message, Topic } from './types';
import { ALL_TOPICS } from './constants';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(ALL_TOPICS[0].id);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatContext, setChatContext] = useState<string | undefined>(undefined);
  
  // Mobile Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getCurrentTopic = (): Topic => {
    return ALL_TOPICS.find(t => t.id === currentTopicId) || ALL_TOPICS[0];
  };

  const handleTopicComplete = (id: string) => {
    if (!completedTopics.includes(id)) {
      setCompletedTopics([...completedTopics, id]);
    }
  };

  const handleSwitchToChat = (context: string) => {
    setChatContext(context);
    setMode(AppMode.CHAT);
  };

  const handleSetTopic = (id: string) => {
    setCurrentTopicId(id);
    setMode(AppMode.CURRICULUM);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 overflow-hidden font-sans">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-md shadow-lg" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          currentMode={mode} 
          setMode={(m) => {
            setMode(m);
            setIsSidebarOpen(false); // Close on mobile selection
          }} 
          currentTopicId={currentTopicId} 
          setTopic={(id) => {
            handleSetTopic(id);
            setIsSidebarOpen(false);
          }}
          completedTopicIds={completedTopics}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative w-full">
        {mode === AppMode.DASHBOARD && (
          <DashboardView 
            completedTopics={completedTopics}
            setTopic={handleSetTopic}
          />
        )}

        {mode === AppMode.CURRICULUM && (
          <CurriculumView 
            topic={getCurrentTopic()} 
            onComplete={handleTopicComplete}
            isCompleted={completedTopics.includes(getCurrentTopic().id)}
            switchToChat={handleSwitchToChat}
          />
        )}

        {mode === AppMode.CHAT && (
          <ChatArea 
            messages={chatMessages} 
            setMessages={setChatMessages} 
            initialContext={chatContext}
          />
        )}
        
        {mode === AppMode.MOCK_INTERVIEW && (
          <ChatArea 
            messages={chatMessages.length === 0 ? [] : chatMessages} // Can separate interview state if desired
            setMessages={setChatMessages} 
            placeholder="Type 'Start Mock Interview' to begin..."
            initialContext="Start a mock technical interview with me. Ask me one question at a time, evaluate my answer, and then move to the next. Start with a medium difficulty DSA question."
          />
        )}
      </div>
    </div>
  );
};

export default App;