import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton, Box,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { IQuiz } from "../../types/quizTypes.ts";
import { useAppDispatch } from "../../hooks/redux-hooks.ts";
import { addQuizThunk, getAllQuizzesThunk, setAllQuizzesThunk, updateQuizThunk } from "../../store/quiz/quizThunks.ts";
import { DEFAULT_QUIZ_ID } from "../../helpers/constants/constants.ts";
import { retrieveQuizzesFromLocalStorage } from "../../helpers/localStorage.ts";

interface IQuizFormProps {
  quiz: IQuiz | null;
  onClose: () => void;
}

const QuizForm: React.FC<IQuizFormProps> = ({ quiz, onClose }) => {
  const [name, setName] = useState(quiz?.name || "");
  const [description, setDescription] = useState(quiz?.description || "");
  const [questions, setQuestions] = useState(quiz?.questions || []);
  const dispatch = useAppDispatch();

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: Date.now().toString(), text: "", answers: [], points: 1 }]);
  };

  const handleQuestionChange = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].text = text;
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].answers.push({ id: Date.now().toString(), text: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleSave = async () => {
    const updatedQuiz = {
      ...quiz,
      id: quiz?.id || uuidv4(),
      rating: quiz?.rating || 0,
      name,
      description,
      questions,
    };

    if (updatedQuiz.id === "0") {
      await dispatch(addQuizThunk(updatedQuiz));
    } else {
      await dispatch(updateQuizThunk(updatedQuiz));
    }

    const quizzesData = retrieveQuizzesFromLocalStorage();
    await dispatch(getAllQuizzesThunk());
    await dispatch(setAllQuizzesThunk(quizzesData.quizzes));
    onClose();
  };

  const handleRemoveAnswer = (questionId: string, answerIndex: number) => {
    const foundQuestion = questions.find(question => question.id === questionId);
    if (!foundQuestion) return;
    foundQuestion.answers.splice(answerIndex, 1);

    const newQuestions = questions.map(question => {
      if (question.id === questionId) {
         return foundQuestion;
      }
      return question;
    });

    setQuestions(newQuestions);
  };

  return <Container>
    <Typography variant="h5" gutterBottom>
      {quiz?.id === DEFAULT_QUIZ_ID ? "Add Quiz" : "Edit Quiz"}
    </Typography>
    <TextField
      label="Quiz Name"
      variant="outlined"
      fullWidth
      margin="normal"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <TextField
      label="Description"
      variant="outlined"
      fullWidth
      margin="normal"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <Button variant="contained" color="secondary" onClick={handleAddQuestion} startIcon={<Add />} sx={{
      marginTop: "auto",
    }}>
      Add Question
    </Button>
    {questions.map((question, qIndex) => (
      <Paper key={question.id} style={{ padding: 16, marginTop: 16 }}>
        <TextField
          label="Question Text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={question.text}
          onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
        />
        <Button variant="contained" onClick={() => handleAddAnswer(qIndex)} startIcon={<Add />}>
          Add Answer
        </Button>
        {question.answers.map((answer, answerIndex) => (
          <Paper key={answer.id} style={{ padding: 8, marginTop: 8 }}>
            <TextField
              label="Answer Text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={answer.text}
              onChange={(e) => handleAnswerChange(qIndex, answerIndex, e.target.value)}
            />
            <IconButton onClick={() => handleRemoveAnswer(question.id, answerIndex)}>
              <Delete />
            </IconButton>
          </Paper>
        ))}
      </Paper>
    ))}
    <Box>
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 16 }}>
        Save
      </Button>
      <Button variant="outlined" onClick={onClose} style={{ marginTop: 16, marginLeft: 16 }}>
        Cancel
      </Button>
    </Box>
  </Container>;
};

export default QuizForm;
