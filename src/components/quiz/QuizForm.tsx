import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton, Box, Checkbox, FormControlLabel,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { IQuiz } from "../../types/quizTypes.ts";
import { useAppDispatch } from "../../hooks/redux-hooks.ts";
import { addQuizThunk, getAllQuizzesThunk, setAllQuizzesThunk, updateQuizThunk } from "../../store/quiz/quizThunks.ts";
import { retrieveQuizzesFromLocalStorage, setQuizzesToLocalStorage } from "../../helpers/localStorage.ts";

interface IQuizFormProps {
  quiz: IQuiz | null;
  onClose: () => void;
  isEditing?: boolean;
}

const QuizForm: React.FC<IQuizFormProps> = ({ quiz, onClose, isEditing = false }) => {
  const [name, setName] = useState(quiz?.name || "");
  const [description, setDescription] = useState(quiz?.description || "");
  const [questions, setQuestions] = useState(quiz?.questions || []);
  const dispatch = useAppDispatch();

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: Date.now().toString(), text: "", answers: [], points: 1 }]);
  };

  const handleQuestionChange = (index: number, text: string) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map((question, prevQuestionIndex) => {
        if (prevQuestionIndex === index) {
          return {
            ...question,
            text: text,
          };
        }
        return question;
      });
    });
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, text: string) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map((question, prevQuestionIndex) => {
        if (prevQuestionIndex === questionIndex) {
          return {
            ...question,
            answers: question.answers.map((answer, prevAnswerIndex) => {
              if (prevAnswerIndex === answerIndex) {
                return {
                  ...answer,
                  text: text,
                };
              }
              return answer;
            }),
          };
        }
        return question;
      });
    });
  };

  const handleAddAnswer = (index: number) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map((question, prevQuestionIndex) => {
        if (prevQuestionIndex === index) {
          return {
            ...question,
            answers: [
              ...question.answers,
              { id: Date.now().toString(), text: "", isCorrect: false },
            ],
          };
        }
        return question;
      });
    });
  };

  const handleSave = async () => {
    const quizzesData = retrieveQuizzesFromLocalStorage();

    const updatedQuiz: IQuiz = {
      ...quiz,
      id: quiz?.id || uuidv4(),
      rating: quiz?.rating || 0,
      name,
      description,
      questions,
    };

    let updatedQuizzes = [];

    if (quizzesData !== null) {
      updatedQuizzes = quizzesData || [];
      if (quiz === null) {
        updatedQuizzes.push(updatedQuiz);
      } else {
        updatedQuizzes = updatedQuizzes.map((quiz: IQuiz) => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz));
      }
    } else {
      // If no quizzes exist in local storage, initialize with the new quiz
      updatedQuizzes = [updatedQuiz];
      await dispatch(addQuizThunk(updatedQuiz));
    }

    setQuizzesToLocalStorage(updatedQuizzes);

    if (quiz === null) {
      await dispatch(addQuizThunk(updatedQuiz));
    } else {
      await dispatch(updateQuizThunk(updatedQuiz));
    }

    await dispatch(setAllQuizzesThunk(updatedQuizzes));
    await dispatch(getAllQuizzesThunk());
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

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number,
  ) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question, prevQuestionIndex) => {
        if (prevQuestionIndex === questionIndex) {
          return {
            ...question,
            answers: question.answers.map((answer, prevAnswerIndex) => {
              if (prevAnswerIndex === answerIndex) {
                return {
                  ...answer,
                  isCorrect: !answer.isCorrect,
                };
              }
              return answer;
            }),
          };
        }
        return question;
      });
    });
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add Quiz
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
      {questions.map((question, questionIndex) => (
        <Paper key={question.id} style={{ padding: 16, marginTop: 16 }}>
          <TextField
            label="Question Text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={question.text}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
          />
          <Button variant="contained" onClick={() => handleAddAnswer(questionIndex)} startIcon={<Add />}>
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
                onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answer.isCorrect}
                    onChange={() =>
                      handleCorrectAnswerChange(questionIndex, answerIndex)
                    }
                  />
                }
                label="This is the correct answer?"
              />
              <IconButton onClick={() => handleRemoveAnswer(question.id, answerIndex)}>
                <Delete />
              </IconButton>
            </Paper>
          ))}
        </Paper>
      ))}
      <Button variant="contained" color="secondary" onClick={handleAddQuestion} startIcon={<Add />} sx={{
        marginTop: "auto",
      }}>
        Add Question
      </Button>
      <Box>
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 16 }}>
          {isEditing ? "Save Edit" : "Save"}
        </Button>
        <Button variant="outlined" onClick={onClose} style={{ marginTop: 16, marginLeft: 16 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default QuizForm;
