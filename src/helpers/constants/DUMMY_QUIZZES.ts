import { IQuiz } from "../../types/quizTypes.ts";

export const DUMMY_QUIZZES: IQuiz[] = [
  {
    id: "1",
    name: "Science Quiz",
    description: "Test your knowledge of science!",
    questions: [
      {
        id: "1",
        text: "What is the capital of France?",
        answers: [
          { id: "1", text: "Paris", isCorrect: true, type: "text" },
          { id: "2", text: "London", isCorrect: false, type: "text" },
          { id: "3", text: "Berlin", isCorrect: false, type: "text" },
        ],
        points: 10,
      },
      {
        id: "2",
        text: "What is the chemical symbol for water?",
        answers: [
          { id: "1", text: "H2O", isCorrect: true, type: "text" },
          { id: "2", text: "CO2", isCorrect: false, type: "text" },
          { id: "3", text: "O2", isCorrect: false, type: "text" },
        ],
        points: 15,
      },
    ],
    rating: 4.5,
  },
  {
    id: "2",
    name: "History Quiz",
    description: "Test your knowledge of history!",
    questions: [
      {
        id: "1",
        text: "Who was the first president of the United States?",
        answers: [
          { id: "1", text: "George Washington", isCorrect: true, type: "text" },
          { id: "2", text: "Abraham Lincoln", isCorrect: false, type: "text" },
          { id: "3", text: "Thomas Jefferson", isCorrect: false, type: "text" },
        ],
        points: 10,
      },
      {
        id: "2",
        text: "When did World War II end?",
        answers: [
          { id: "1", text: "1945", isCorrect: true, type: "text" },
          { id: "2", text: "1939", isCorrect: false, type: "text" },
          { id: "3", text: "1918", isCorrect: false, type: "text" },
        ],
        points: 15,
      },
    ],
    rating: 4.0,
  },
];
