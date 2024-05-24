import React from 'react';
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Container
} from '@mui/material';
import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.ts";
import { deleteQuiz, setEditingQuiz, setSearchQuery, startQuiz } from "../../store/quiz/quizSlice.ts";
import QuizForm from "./QuizForm.tsx";
import { IQuiz } from "../../types/quizTypes.ts";
import { selectEditingQuiz, selectQuizzes, selectSearchQuery } from "../../store/quiz/quizSelectors.ts";

const QuizList: React.FC = () => {
  const dispatch = useAppDispatch();
  const quizzes = useAppSelector(selectQuizzes);
  const searchQuery = useAppSelector(selectSearchQuery);
  const editingQuiz = useAppSelector(selectEditingQuiz);

  const filteredQuizzes = (quizzes || []).filter(quiz =>
    quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    dispatch(deleteQuiz(id));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleStartQuiz = (id: string) => {
    dispatch(startQuiz(id));
  };

  const handleEditQuiz = (quiz: IQuiz) => {
    setEditingQuiz(quiz);
  };

  const handleCloseForm = () => {
    setEditingQuiz(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quizzes
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      <List>
        {filteredQuizzes.map(quiz => (
          <ListItem key={quiz.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleDelete(quiz.id)}>
                <Delete />
              </IconButton>
              <IconButton edge="end" onClick={() => handleEditQuiz(quiz)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleStartQuiz(quiz.id)}>
                <PlayArrow />
              </IconButton>
            </>
          }>
            <ListItemText primary={quiz.name} />
          </ListItem>
        ))}
      </List>
      {editingQuiz && <QuizForm quiz={editingQuiz} onClose={handleCloseForm} />}
    </Container>
  );
};

export default QuizList;