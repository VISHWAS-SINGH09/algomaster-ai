import React from 'react';
import { Topic } from '../types';
import { DSA_TOPICS, CS_TOPICS } from '../constants';
import { TrendingUp, CheckCircle, Circle, Activity } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface DashboardViewProps {
  completedTopics: string[];
  setTopic: (id: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ completedTopics, setTopic }) => {
  const totalDSA = DSA_TOPICS.length;
  const totalCS = CS_TOPICS.length;
  const completedDSA = DSA_TOPICS.filter(t => completedTopics.includes(t.id)).length;
  const completedCS = CS_TOPICS.filter(t => completedTopics.includes(t.id)).length;
  
  const totalTopics = totalDSA + totalCS;
  const totalCompleted = completedDSA + completedCS;
  const progressPercentage = Math.round((totalCompleted / totalTopics) * 100);

  const StatCard = ({ label, value, subtext, icon: Icon, colorClass }: any) => (
    <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-slate-500 text-xs mt-1">{subtext}</p>
      </div>
      <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass}`}>
        <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-y-auto p-4 sm:p-8 space-y-8">
      
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Engineer</h1>
        <p className="text-slate-400">Track your progress and practice your coding skills.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Progress" 
          value={`${progressPercentage}%`} 
          subtext={`${totalCompleted} of ${totalTopics} topics`}
          icon={TrendingUp}
          colorClass="bg-indigo-500 text-indigo-500"
        />
        <StatCard 
          label="DSA Mastery" 
          value={`${completedDSA}/${totalDSA}`} 
          subtext="Data Structures & Algos"
          icon={Activity}
          colorClass="bg-emerald-500 text-emerald-500"
        />
        <StatCard 
          label="CS Fundamentals" 
          value={`${completedCS}/${totalCS}`} 
          subtext="OS, DBMS, Networks"
          icon={CheckCircle}
          colorClass="bg-blue-500 text-blue-500"
        />
         <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl flex flex-col justify-center items-center text-center">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Next Suggested Topic</p>
            {DSA_TOPICS.find(t => !completedTopics.includes(t.id)) ? (
               <button 
                onClick={() => setTopic(DSA_TOPICS.find(t => !completedTopics.includes(t.id))!.id)}
                className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
               >
                 {DSA_TOPICS.find(t => !completedTopics.includes(t.id))?.title} &rarr;
               </button>
            ) : (
                <span className="text-emerald-400 font-medium">All Topics Completed! 🎉</span>
            )}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Course Breakdown</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Data Structures & Algorithms</span>
              <span className="text-slate-400">{Math.round((completedDSA/totalDSA)*100)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(completedDSA/totalDSA)*100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Computer Science Fundamentals</span>
              <span className="text-slate-400">{Math.round((completedCS/totalCS)*100)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(completedCS/totalCS)*100}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor Section */}
      <div className="flex-1 min-h-[500px]">
        <h3 className="text-xl font-bold text-white mb-4">Code Playground</h3>
        <CodeEditor />
      </div>

    </div>
  );
};

export default DashboardView;