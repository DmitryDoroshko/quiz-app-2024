import { IQuiz } from "../types/quizTypes.ts";
import { DELAY_TIME_IN_MILLISECONDS, LOCAL_STORAGE_QUIZZES_IDENTIFIER } from "../helpers/constants/constants.ts";
import { setQuizzesToLocalStorage } from "../helpers/localStorage.ts";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface IQuizService {
  getAllQuizzes(): Promise<IQuiz[]>;
  getQuizById(id: string): Promise<IQuiz | undefined>;
  addQuiz(quiz: IQuiz): Promise<IQuiz>;
  updateQuiz(quiz: IQuiz): Promise<IQuiz>;
  deleteQuiz(id: string): Promise<void>;
  setAllQuizzes(quizzes: IQuiz[]): Promise<IQuiz[]>;
}

 export class QuizService implements IQuizService {
   async getAllQuizzes(): Promise<IQuiz[]> {
     await delay(DELAY_TIME_IN_MILLISECONDS); // Simulate artificial delay
     const quizzesString = localStorage.getItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER);
     return quizzesString ? JSON.parse(quizzesString) : [];
   }

   async setAllQuizzes(quizzes: IQuiz[]): Promise<IQuiz[]> {
     await delay(DELAY_TIME_IN_MILLISECONDS); // Simulate artificial delay
     setQuizzesToLocalStorage(quizzes);
     return quizzes;
   }

   async getQuizById(id: string): Promise<IQuiz | undefined> {
     await delay(DELAY_TIME_IN_MILLISECONDS); // Simulate artificial delay
     const quizzes = await this.getAllQuizzes();
     return quizzes.find(quiz => quiz.id === id);
   }

   async addQuiz(quiz: IQuiz): Promise<IQuiz> {
     await delay(DELAY_TIME_IN_MILLISECONDS); // Simulate artificial delay
     const quizzes = await this.getAllQuizzes();
     const newQuiz = { ...quiz, id: Date.now().toString() };
     setQuizzesToLocalStorage([...quizzes, newQuiz]);
     return newQuiz;
   }

   async updateQuiz(updatedQuiz: IQuiz): Promise<IQuiz> {
     await delay(DELAY_TIME_IN_MILLISECONDS); // Simulate artificial delay
     const quizzes = await this.getAllQuizzes();
     const index = quizzes.findIndex(quiz => quiz.id === updatedQuiz.id);
     if (index !== -1) {
       quizzes[index] = updatedQuiz;
       setQuizzesToLocalStorage(quizzes);
       return updatedQuiz;
     } else {
       throw new Error('Quiz not found');
     }
   }

   async deleteQuiz(id: string): Promise<void> {
     await delay(DELAY_TIME_IN_MILLISECONDS); // Simulate artificial delay
     const quizzes = await this.getAllQuizzes();
     const filteredQuizzes = quizzes.filter(quiz => quiz.id !== id);
     setQuizzesToLocalStorage(filteredQuizzes);
   }
}
