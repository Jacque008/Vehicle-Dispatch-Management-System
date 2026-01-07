export interface Test {
  id: string;
  title: string;
  description?: string;
  passingScore: number;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestQuestion {
  id: string;
  testId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  orderIndex: number;
}

export interface TestResult {
  id: string;
  driverId: string;
  testId: string;
  answers: Record<string, string>;
  score: number;
  passed: boolean;
  takenAt: Date;
}

export interface CreateTestInput {
  title: string;
  description?: string;
  passingScore: number;
}

export interface SubmitTestInput {
  testId: string;
  answers: Record<string, string>;
}
