export type CategoryType = 
  | 'java'
  | 'spring-boot'
  | 'web-dev'
  | 'java-libraries'
  | 'cloud-devops'
  | 'logical-programs'
  | 'pattern-programs'
  | 'mcqs'
  | 'tools';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  output?: string;
  description?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  slug: string;
  category: CategoryType;
  categoryLabel: string;
  summary: string;
  readTime: string;
  difficulty: DifficultyLevel;
  date: string;
  author: string;
  tags: string[];
  contentSections: {
    heading: string;
    body: string;
    codeSnippet?: CodeExample;
    keyTakeaway?: string;
  }[];
  relatedSlugs?: string[];
}

export interface LogicalProgram {
  id: string;
  title: string;
  slug: string;
  category: 'sorting' | 'searching' | 'arrays' | 'strings' | 'patterns' | 'recursion' | 'collections';
  difficulty: DifficultyLevel;
  description: string;
  javaCode: string;
  expectedOutput: string;
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  questionCount: number;
  questions: QuizQuestion[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  level: 'Fresher' | 'Mid-Level' | 'Senior/Lead';
  answer: string;
  codeSnippet?: string;
  expectedOutput?: string;
  popularInCompanies?: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  category: 'Core Java' | 'Spring Boot' | 'Frontend & Web' | 'Databases & Persistence' | 'DevOps & Cloud' | 'System Architecture';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  source: string; // e.g., 'Oracle Java Docs', 'Spring Boot Ref', 'Baeldung', 'StackOverflow Trends', 'Java Spec'
  sourceUrl?: string;
  answer: string;
  codeExample?: {
    language: string;
    code: string;
    description?: string;
  };
  keyTakeaways?: string[];
  tags: string[];
}

export interface BookmarkItem {
  id: string;
  title: string;
  type: 'tutorial' | 'program' | 'interview' | 'faq';
  slug: string;
  category: string;
  timestamp: number;
}

export interface RecentlyViewedItem {
  id: string;
  title: string;
  type: 'tutorial' | 'program' | 'interview' | 'code-snippet' | 'faq';
  slug?: string;
  category: string;
  viewedAt: number;
  snippetPreview?: string;
  readTime?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role?: string;
  avatarUrl?: string;
  joinedAt: number;
}

