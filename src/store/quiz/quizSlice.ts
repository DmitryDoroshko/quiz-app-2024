import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuizState, IQuiz } from "../../types/quizTypes.ts";
import { getAllQuizzesThunk, setAllQuizzesThunk } from "./quizThunks.ts";
import { DEFAULT_QUIZ_ID, TIMER_TIME_IN_SECONDS } from "../../helpers/constants/constants.ts";

const initialState: IQuizState = {
  quizzes: [],
  currentQuizId: null,
  currentQuestionIndex: DEFAULT_QUIZ_ID,
  score: 0,
  timer: 0,
  searchQuery: "",
  currentQuiz: null,
  editingQuiz: null,
  loadingAllQuizzes: false,
  getAllQuizzesError: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes(state, action: PayloadAction<IQuiz[]>) {
      state.quizzes = action.payload;
    },
    addQuiz(state, action: PayloadAction<IQuiz>) {
      state.quizzes.push(action.payload);
    },
    deleteQuiz(state, action: PayloadAction<string>) {
      state.quizzes = state.quizzes.filter(quiz => quiz.id !== action.payload);
    },
    updateQuiz(state, action: PayloadAction<IQuiz>) {
      const index = state.quizzes.findIndex(quiz => quiz.id === action.payload.id);
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
    setCurrentQuiz(state, action: PayloadAction<string>) {
      state.currentQuizId = action.payload;
      state.currentQuiz = state.quizzes.find(quiz => quiz.id === action.payload)!;
      state.currentQuestionIndex = DEFAULT_QUIZ_ID;
      state.score = 0;
    },
    setEditingQuiz(state, action: PayloadAction<IQuiz | null>) {
      state.editingQuiz = action.payload;
    },
    answerQuestion(state, action: PayloadAction<{ questionId: string; answerId: string }>) {
      const currentQuiz = state.quizzes.find(quiz => quiz.id === state.currentQuizId);
      if (currentQuiz) {
        const currentQuestion = currentQuiz.questions[+state.currentQuestionIndex];
        const selectedAnswer = currentQuestion.answers.find(answer => answer.id === action.payload.answerId);
        if (selectedAnswer?.isCorrect) {
          state.score += currentQuestion.points;
        }
        state.currentQuestionIndex += 1;
      }
    },
    startQuiz(state, action: PayloadAction<string>) {
      state.currentQuizId = action.payload;
      state.currentQuestionIndex = DEFAULT_QUIZ_ID;
      state.score = 0;
      state.timer = TIMER_TIME_IN_SECONDS;
    },
    restartQuiz(state, action: PayloadAction<string>) {
      state.currentQuizId = action.payload;
      state.currentQuestionIndex = DEFAULT_QUIZ_ID;
      state.score = 0;
      state.timer = TIMER_TIME_IN_SECONDS;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    rateQuiz(state, action: PayloadAction<{ quizId: string; rating: number }>) {
      const quiz = state.quizzes.find(quiz => quiz.id === action.payload.quizId);
      if (quiz) {
        quiz.rating = action.payload.rating;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllQuizzesThunk.pending, state => {
        state.loadingAllQuizzes = true;
        state.getAllQuizzesError = null;
      })
      .addCase(getAllQuizzesThunk.fulfilled, (state, action) => {
        state.loadingAllQuizzes = false;
        state.quizzes = action.payload;
      })
      .addCase(getAllQuizzesThunk.rejected, (state, action) => {
        state.loadingAllQuizzes = false;
        state.getAllQuizzesError = action.error.message || "An error occurred";
      });
    builder.addCase(setAllQuizzesThunk.fulfilled, (state, action) => {
      state.quizzes = action.payload;
    });
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setCurrentQuiz,
  setEditingQuiz,
  answerQuestion,
  restartQuiz,
  setSearchQuery,
  setTimer,
  startQuiz,
  setQuizzes,
  rateQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
