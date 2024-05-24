import React from 'react';
import { Button, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.ts";
import { RootState } from "../../store";
import { restartQuiz } from "../../store/quiz/quizSlice.ts";

const Result: React.FC = () => {
  const dispatch = useAppDispatch();
  const { score, quizzes, currentQuizId } = useAppSelector((state: RootState) => state.quiz);
  const currentQuiz = (quizzes || []).find(quiz => quiz.id === currentQuizId);
  const totalQuestions = currentQuiz?.questions.length || 0;

  const handleRestart = () => {
    dispatch(restartQuiz());
  };

  return (
    <Container>
      <Typography variant="h4">Your Score: {score} / {totalQuestions}</Typography>
      <List>
        {currentQuiz?.questions.map((question) => (
          <ListItem key={question.id}>
            <Paper style={{ padding: 16, width: '100%' }}>
              <ListItemText primary={question.text} />
              <List>
                {question.answers.map((answer) => (
                  <ListItem key={answer.id}>
                    <ListItemText primary={answer.text} secondary={answer.isCorrect ? 'Correct' : ''} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleRestart} style={{ marginTop: 16 }}>
        Restart Quiz
      </Button>
    </Container>
  );
};

export default Result;
