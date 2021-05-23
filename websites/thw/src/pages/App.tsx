import React from "react";

import QuizQuestions from "../assets/questions.json";

import {
  QuestionRepository,
  Question,
  Answer,
} from "../core/QuestionRepository";

import { Quiz } from "../components/Quiz";

function createStoreFromQuestions() {
  const repository = new QuestionRepository();

  for (const quizQuestion of QuizQuestions) {
    const answers = Object.entries(quizQuestion.answers).map(
      ([key, value]) => new Answer(key, value.text, value.checked)
    );

    repository.addQuestion(
      new Question(quizQuestion.question, answers, quizQuestion.category)
    );
  }

  repository.activateLastAnsweredQuestion();

  return repository;
}

export const App = () => {
  const store = createStoreFromQuestions();

  return (
    <div className="container mt-4">
      <Quiz questions={store} />
    </div>
  );
};
