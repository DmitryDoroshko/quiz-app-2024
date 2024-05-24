export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  type?: 'text' | 'multiple-choice';
}

export interface IQuestion {
  id: string;
  text: string;
  answers: IAnswer[];
  points: number;
}

export interface IQuizState {
  quizzes: IQuiz[];
  currentQuizId: string | null;
  currentQuiz: IQuiz | null;
  editingQuiz: IQuiz | null;
  currentQuestionIndex: string;
  score: number;
  timer: number;
  searchQuery: string;
  loadingAllQuizzes: boolean;
  getAllQuizzesError: Error | string | null;
}

export interface IQuiz {
  id: string;
  name: string;
  description: string;
  questions: IQuestion[];
  rating: number;
}
