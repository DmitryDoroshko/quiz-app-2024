import React, { useEffect, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const currentQuiz = useAppSelector(selectCurrentQuiz);
  const currentQuestionIndex = useAppSelector(selectCurrentQuestionIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const quizzesData = retrieveQuizzesFromLocalStorage();
    if (!quizzesData) {
      initializeLocalStorageWithDummyQuizzes();
    }
    dispatch(getAllQuizzesThunk());
    dispatch(setQuizzes(quizzesData.quizzes));
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Demetra Quiz App 2024</Typography>
      {isFormOpen ? (
        <QuizForm onClose={() => setIsFormOpen(false)} quiz={currentQuiz} />
      ) : null}
      <QuizList />
      {+currentQuestionIndex < (currentQuiz?.questions.length || 0) ? (
        <Question />
      ) : (
        <Result />
      )}

      <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)} style={{ marginTop: 16 }}>
        Add Quiz
      </Button>
    </Container>
  );
};

export default App;
