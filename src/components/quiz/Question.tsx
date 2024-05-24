import React, { useEffect } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.ts";
import { answerQuestion, setTimer } from "../../store/quiz/quizSlice.ts";

const Question: React.FC = () => {
  const dispatch = useAppDispatch();
  const { quizzes, currentQuizId, currentQuestionIndex, timer } = useAppSelector((state: RootState) => state.quiz);
  const currentQuiz = quizzes.find(quiz => quiz.id === currentQuizId);
  const currentQuestion = currentQuiz?.questions[+currentQuestionIndex];

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        dispatch(setTimer(timer - 1));
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      dispatch(answerQuestion({ questionId: currentQuestion!.id, answerId: "0"}));
    }
  }, [timer, dispatch]);

  if (!currentQuestion) {
    return <div>No more questions</div>;
  }

  const handleAnswer = (answerId: string) => {
    dispatch(answerQuestion({ questionId: currentQuestion.id, answerId }));
    dispatch(setTimer(30)); // Reset timer for next question
  };

  return (
    <Container>
      <Typography variant="h5">{currentQuestion.text}</Typography>
      <Typography variant="subtitle1">Time remaining: {timer} seconds</Typography>
      {currentQuestion.answers.map(answer => (
        <Button
          key={answer.id}
          variant="contained"
          color="primary"
          onClick={() => handleAnswer(answer.id)}
          style={{ marginTop: 8, display: 'block' }}
        >
          {answer.text}
        </Button>
      ))}
    </Container>
  );
};

export default Question;
