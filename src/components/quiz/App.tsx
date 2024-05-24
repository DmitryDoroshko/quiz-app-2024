import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.ts";
import QuizForm from "./QuizForm.tsx";
import QuizList from "./QuizList.tsx";
import Question from "./Question.tsx";
import Result from "./Result.tsx";
import { getAllQuizzesThunk } from "../../store/quiz/quizThunks.ts";
import {
  initializeLocalStorageWithDummyQuizzes,
  retrieveQuizzesFromLocalStorage,
} from "../../helpers/localStorage.ts";
import { setQuizzes } from "../../store/quiz/quizSlice.ts";
import {
  selectCurrentQuestionIndex,
  selectCurrentQuiz,
} from "../../store/quiz/quizSelectors.ts";

const App: React.FC = () => {
  const [formKey, setFormKey] = useState(0);
  const currentQuiz = useAppSelector(selectCurrentQuiz);
  const currentQuestionIndex = useAppSelector(selectCurrentQuestionIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const quizzesData = retrieveQuizzesFromLocalStorage();
    if (!quizzesData) {
      initializeLocalStorageWithDummyQuizzes();
    }
    dispatch(getAllQuizzesThunk());
    dispatch(setQuizzes(quizzesData || []));
  }, [dispatch]);

  const resetForm = () => {
    setFormKey(prevKey => prevKey + 1); // Update form key to trigger form reset
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Demetra Quiz App 2024</Typography>
      <QuizForm key={formKey} onClose={resetForm} quiz={currentQuiz} />
      <QuizList />
      {+currentQuestionIndex < (currentQuiz?.questions.length || 0) ? (
        <Question />
      ) : (
        <Result />
      )}
    </Container>
  );
};

export default App;
