export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  CURRICULUM = 'CURRICULUM',
  CHAT = 'CHAT',
  MOCK_INTERVIEW = 'MOCK_INTERVIEW'
}

export enum TopicCategory {
  DSA = 'Data Structures & Algorithms',
  CS_FUNDAMENTALS = 'CS Fundamentals',
  SYSTEM_DESIGN = 'System Design'
}

export interface Topic {
  id: string;
  title: string;
  category: TopicCategory;
  description: string;
  isCompleted?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export interface LearningState {
  currentTopicId: string | null;
  completedTopicIds: string[];
}