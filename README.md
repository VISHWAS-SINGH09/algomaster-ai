# AlgoMaster AI 🚀

An intelligent learning platform for mastering Data Structures, Algorithms, and Computer Science fundamentals. Built with React, TypeScript, and powered by Google's Gemini AI.

## ✨ Features

- **Interactive Learning**: Comprehensive curriculum covering DSA and CS fundamentals
- **AI Mentor**: Chat with Gemini AI for personalized guidance and explanations
- **Progress Tracking**: Track your learning journey with completion status
- **Mock Interviews**: Practice technical interviews with AI-powered questions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Streaming**: Get AI responses as they're generated

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (via utility classes)
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React
- **Markdown**: React Markdown for rich content rendering

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- A Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd algomaster-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   > **Note**: You may see TypeScript warnings about `@google/genai` types. This is expected as the package is relatively new. The application will work correctly despite these warnings.

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📚 Learning Modules

### Data Structures & Algorithms
- Time & Space Complexity
- Arrays & Strings
- Linked Lists
- Stacks & Queues
- Trees & Binary Search Trees
- Graphs (BFS/DFS)
- Dynamic Programming
- And more...

### CS Fundamentals
- Operating Systems
- Database Management
- Computer Networks
- Object-Oriented Programming

## 🤖 AI Features

- **Contextual Learning**: AI understands your current topic and provides relevant help
- **Code Analysis**: Get explanations for algorithms and data structures
- **Interview Prep**: Practice with AI-generated technical questions
- **Socratic Method**: AI guides you to solutions rather than giving direct answers

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Lucide for beautiful icons
- The React and TypeScript communities
