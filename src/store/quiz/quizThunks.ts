import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuizService } from "../../api/service.ts";
import { IQuiz } from "../../types/quizTypes.ts";

const QuizServiceInstance = new QuizService();

export const getAllQuizzesThunk = createAsyncThunk(
  'quiz/getAllQuizzes',
  async (_) => {
    return await QuizServiceInstance.getAllQuizzes(); // Provide state if needed
  }
);

export const setAllQuizzesThunk = createAsyncThunk("quiz/setAllQuizzes", async (quizzes: IQuiz[]) => {
  return await QuizServiceInstance.setAllQuizzes(quizzes);
});

export const addQuizThunk = createAsyncThunk(
  'quiz/addQuiz',
  async (newQuiz: IQuiz) => {
    return await QuizServiceInstance.addQuiz(newQuiz);
  }
);

export const updateQuizThunk = createAsyncThunk(
  'quiz/updateQuiz',
  async (updatedQuiz: IQuiz) => {
    return await QuizServiceInstance.updateQuiz(updatedQuiz);
  }
);

export const deleteQuizThunk = createAsyncThunk(
  'quiz/deleteQuiz',
  async (id: string) => {
    await QuizServiceInstance.deleteQuiz(id);
    return id; // Return the deleted quiz ID
  }
);