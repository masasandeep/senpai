interface InterView {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
  feedback?: string
}
interface TechStackProps {
  techstack: string[];
}
interface AuthProps{
  email: string;
  username?: string;
  password: string;
}

interface Messages {
  role: 'system' | 'assistant' | 'user'
  content: string
}

interface AllUser {
  username: string;
  email?: string;
  id: string;
}

interface AgentProps{
  userId: string
  username: string
  type: "generate" | "interview"
  interviewId?: string;
  feedbackId?: string;
  questions?:string[]
}
interface CreateFeedback{
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}
interface FeedbackStructure {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}