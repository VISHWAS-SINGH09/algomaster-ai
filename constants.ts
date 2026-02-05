import { Topic, TopicCategory } from './types';

export const DSA_TOPICS: Topic[] = [
  { id: 'dsa-1', title: 'Time & Space Complexity', category: TopicCategory.DSA, description: 'Big O notation, analysis of loops, and recursion.' },
  { id: 'dsa-2', title: 'Arrays & Strings', category: TopicCategory.DSA, description: 'Sliding window, two pointers, prefix sum techniques.' },
  { id: 'dsa-3', title: 'Linked Lists', category: TopicCategory.DSA, description: 'Singly, doubly, circular lists, and fast/slow pointer.' },
  { id: 'dsa-4', title: 'Stacks & Queues', category: TopicCategory.DSA, description: 'Implementation, monotonic stacks, priority queues.' },
  { id: 'dsa-5', title: 'Recursion & Backtracking', category: TopicCategory.DSA, description: 'Base cases, state space trees, N-Queens, Sudoku.' },
  { id: 'dsa-6', title: 'Trees & BST', category: TopicCategory.DSA, description: 'Traversals, height, depth, LCA, BST properties.' },
  { id: 'dsa-7', title: 'Heaps & Hashing', category: TopicCategory.DSA, description: 'Min/Max heap, heap sort, hash maps, collision handling.' },
  { id: 'dsa-8', title: 'Graphs (BFS/DFS)', category: TopicCategory.DSA, description: 'Adjacency list, connected components, cycles, topological sort.' },
  { id: 'dsa-9', title: 'Advanced Graphs', category: TopicCategory.DSA, description: 'Dijkstra, Bellman-Ford, Prim, Kruskal, Union-Find.' },
  { id: 'dsa-10', title: 'Dynamic Programming', category: TopicCategory.DSA, description: 'Memoization, tabulation, 1D/2D DP, knapsack patterns.' },
  { id: 'dsa-11', title: 'Greedy Algorithms', category: TopicCategory.DSA, description: 'Interval scheduling, Huffman coding, optimal merge.' },
  { id: 'dsa-12', title: 'Tries & Segment Trees', category: TopicCategory.DSA, description: 'Advanced data structures for string and range queries.' },
];

export const CS_TOPICS: Topic[] = [
  { id: 'cs-1', title: 'Operating Systems Basics', category: TopicCategory.CS_FUNDAMENTALS, description: 'Processes, threads, scheduling, deadlocks.' },
  { id: 'cs-2', title: 'Memory Management', category: TopicCategory.CS_FUNDAMENTALS, description: 'Virtual memory, paging, segmentation, caching.' },
  { id: 'cs-3', title: 'DBMS Core', category: TopicCategory.CS_FUNDAMENTALS, description: 'ACID properties, normalization, SQL vs NoSQL.' },
  { id: 'cs-4', title: 'Computer Networks', category: TopicCategory.CS_FUNDAMENTALS, description: 'OSI Model, TCP/IP, HTTP/HTTPS, DNS.' },
  { id: 'cs-5', title: 'Object-Oriented Programming', category: TopicCategory.CS_FUNDAMENTALS, description: 'Polymorphism, inheritance, encapsulation, abstraction.' },
];

export const ALL_TOPICS = [...DSA_TOPICS, ...CS_TOPICS];

export const SYSTEM_INSTRUCTION = `
You are AlgoMaster, a world-class Computer Science mentor specializing in Data Structures, Algorithms (DSA), and CS Fundamentals.
Your goal is to take a student from a complete beginner to an expert capable of cracking top-tier tech interviews (FAANG level).

Guidelines:
1. **Accuracy & Depth**: Provide mathematically accurate time/space complexities. When writing code, write production-quality, clean, and commented code (default to Python or C++ unless asked otherwise).
2. **Teaching Style**: 
   - Use Socratic questioning to guide the user when they are stuck, rather than giving the answer immediately.
   - For beginners, use analogies.
   - For experts, focus on optimization and edge cases.
3. **Curriculum Awareness**: You are aware of the topics: Arrays, Linked Lists, Trees, Graphs, DP, OS, DBMS, Networks.
4. **Placement Focus**: Highlight common interview questions related to the topic being discussed. Mention if a concept is frequently asked by specific companies (e.g., "Google loves Graph problems").
5. **Formatting**: Use Markdown extensively. Use code blocks for code. Use bolding for key terms.

If the user asks to "Start learning [Topic Name]", generate a comprehensive lesson plan for that specific topic including:
- Key Concepts
- Visual/Textual Explanation
- 3 Practice Problems (Easy, Medium, Hard)
- Real-world application
`;
