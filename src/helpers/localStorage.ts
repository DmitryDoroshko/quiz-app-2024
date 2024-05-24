import { DUMMY_QUIZZES } from "./constants/DUMMY_QUIZZES.ts";
import { LOCAL_STORAGE_QUIZZES_IDENTIFIER } from "./constants/constants.ts";
import { IQuiz } from "../types/quizTypes.ts";

export const initializeLocalStorageWithDummyQuizzes = () => {
  localStorage.setItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER, JSON.stringify(DUMMY_QUIZZES));
};

export const retrieveQuizzesFromLocalStorage = () => {
  const quizzesData = localStorage.getItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER);
  return quizzesData ? JSON.parse(quizzesData) : null;
};

export const setQuizzesToLocalStorage = (quizzes: IQuiz[]) => {
  const quizzesStringified = JSON.stringify(quizzes);
  localStorage.setItem(LOCAL_STORAGE_QUIZZES_IDENTIFIER, quizzesStringified);
};