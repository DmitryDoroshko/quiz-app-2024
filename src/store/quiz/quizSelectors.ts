import { createSelector } from '@reduxjs/toolkit';
import { RootState } from "../index.ts";

export const selectQuizzes = (state: RootState) => state.quiz.quizzes;

export const selectCurrentQuiz = (state: RootState) => {
  const currentQuizId = state.quiz.currentQuizId;
  return (state.quiz.quizzes || []).find(quiz => quiz.id === currentQuizId) || null;
};

export const selectCurrentQuestionIndex = (state: RootState) => state.quiz.currentQuestionIndex;

// Selector to get the current question
export const selectCurrentQuestion = createSelector(
  selectCurrentQuiz,
  selectCurrentQuestionIndex,
  (currentQuiz, currentQuestionIndex) => {
    if (currentQuiz && currentQuiz.questions && currentQuiz.questions.length > 0) {
      return currentQuiz.questions[+currentQuestionIndex];
    }
    return null;
  }
);

export const selectScore = (state: RootState) => state.quiz.score;

export const selectLoadingAllQuizzes = (state: RootState) => state.quiz.loadingAllQuizzes;

export const selectGetAllQuizzesError = (state: RootState) => state.quiz.getAllQuizzesError;

export const selectEditingQuiz = (state: RootState) => state.quiz.editingQuiz;

export const selectSearchQuery = (state: RootState) => state.quiz.searchQuery;