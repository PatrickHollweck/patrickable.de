import React, { useState } from "react";

import { QuestionRepository } from "../core/QuestionRepository";

import { QuestionIndex } from "./QuestionIndex";
import { QuestionDisplay } from "./QuestionDisplay";
import { QuestionProgress } from "./QuestionProgress";

type QuizProps = {
  questions: QuestionRepository;
};

export const Quiz = (props: QuizProps) => {
  const { questions } = props;

  let handledAnswerResult = false;

  const [currentQuestion, setCurrentQuestion] = useState(questions.current());
  const [didSubmit, setDidSubmit] = useState(false);

  const handleSubmit = () => {
    setDidSubmit(true);
  };

  const handleAnswerResult = (questionStatus: boolean) => {
    if (handledAnswerResult) {
      return;
    }

    currentQuestion.storage.saveAnswerResult(questionStatus);
    questions.saveCurrentQuestionCursor();

    handledAnswerResult = true;
  };

  const handleContinue = (direction: "forward" | "backward" | "random") => {
    setDidSubmit(false);

    handledAnswerResult = false;

    switch (direction) {
      case "forward":
        setCurrentQuestion(questions.next());
        break;
      case "backward":
        setCurrentQuestion(questions.previous());
        break;
      case "random":
        setCurrentQuestion(questions.random());
        break;
    }
  };

  const handleQuestionSelect = (question: any) => {
    questions.setCursorByValue(question);
    setCurrentQuestion(question);
  };

  const stats = questions.getAll().reduce(
    (acc, question) => {
      if (!question.storage.hasSavedAnswer()) {
        acc.unanswered++;
        return acc;
      }

      if (question.storage.getSavedAnswer() === true) {
        acc.correct++;
        return acc;
      } else {
        acc.wrong++;
        return acc;
      }
    },
    { correct: 0, wrong: 0, unanswered: 0 }
  );

  return (
    <div>
      <div>
        <QuestionIndex
          onSelect={handleQuestionSelect}
          questions={questions.getAll()}
        />

        <div className="mb-3">
          <QuestionProgress
            total={questions.getAll().length}
            correct={stats.correct}
            wrong={stats.wrong}
            unanswered={stats.unanswered}
          />
        </div>

        <QuestionDisplay
          key={currentQuestion.questionID}
          diff={didSubmit}
          question={currentQuestion}
          onDiff={handleAnswerResult}
        />
      </div>

      <div className="mb-3">
        <hr />

        {didSubmit || (
          <div className="w-100 btn-group mb-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleContinue("random")}
            >
              <i className="mr-2 fas fa-random"></i>
              Zufall
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => handleContinue("forward")}
            >
              <i className="mr-2 fas fa-forward"></i>
              Überspringen
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => handleContinue("backward")}
            >
              <i className="mr-2 fas fa-backward"></i>
              Zurück
            </button>
          </div>
        )}
        <button
          className="btn btn-primary btn-block"
          onClick={didSubmit ? () => handleContinue("forward") : handleSubmit}
        >
          {didSubmit ? (
            <>
              <i className="mr-2 fas fa-forward"></i>
              Weiter
              <i className="ml-2 fas fa-forward"></i>
            </>
          ) : (
            <>Prüfen</>
          )}
        </button>
      </div>
    </div>
  );
};
