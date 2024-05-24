import { IQuiz } from "../types/quizTypes.ts";
import { LOCAL_STORAGE_QUIZZES_IDENTIFIER } from "../helpers/constants/constants.ts";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface IQuizService {
  getAllQuizzes(): Promise<IQuiz[]>;
  getQuizById(id: string): Promise<IQuiz | undefined>;
  addQuiz(quiz: IQuiz): Promise<IQuiz>;
  updateQuiz(quiz: IQuiz): Promise<IQuiz>;
  deleteQuiz(id: string): Promise<void>;
}

 export class QuizService implements IQuizService {
   async getAllQuizzes(): Promise<IQuiz[]> {
     await delay(500); // Simulate delay
     const quizzesStr = localStorage.getItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER);
     return quizzesStr ? JSON.parse(quizzesStr) : [];
   }

   async setAllQuizzes(quizzes: IQuiz[]): Promise<IQuiz[]> {
     await delay(500);
     const quizzesStringified = JSON.stringify(quizzes);
     localStorage.setItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER, quizzesStringified);
     return quizzes;
   }

   async getQuizById(id: string): Promise<IQuiz | undefined> {
     await delay(500); // Simulate delay
     const quizzes = await this.getAllQuizzes();
     return quizzes.find(quiz => quiz.id === id);
   }

   async addQuiz(quiz: IQuiz): Promise<IQuiz> {
     await delay(500); // Simulate delay
     const quizzes = await this.getAllQuizzes();
     const newQuiz = { ...quiz, id: Date.now().toString() };
     localStorage.setItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER, JSON.stringify([...quizzes, newQuiz]));
     return newQuiz;
   }

   async updateQuiz(updatedQuiz: IQuiz): Promise<IQuiz> {
     await delay(500); // Simulate delay
     const quizzes = await this.getAllQuizzes();
     const index = quizzes.findIndex(quiz => quiz.id === updatedQuiz.id);
     if (index !== -1) {
       quizzes[index] = updatedQuiz;
       localStorage.setItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER, JSON.stringify(quizzes));
       return updatedQuiz;
     } else {
       throw new Error('Quiz not found');
     }
   }

   async deleteQuiz(id: string): Promise<void> {
     await delay(500); // Simulate delay
     const quizzes = await this.getAllQuizzes();
     const filteredQuizzes = quizzes.filter(quiz => quiz.id !== id);
     localStorage.setItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER, JSON.stringify(filteredQuizzes));
   }
}
