import React from "react";

import { Question as QuestionObject } from "../core/Question";

import { AnswerList } from "./AnswerList";

type QuestionProps = {
  question: QuestionObject;
  diff?: boolean;
  onDiff: (isValid: boolean) => void;
};

export const QuestionDisplay = (props: QuestionProps) => {
  const { question, diff, onDiff } = props;

  return (
    <div className="h-100">
      <div className="jumbotron p-4 mb-3">
        <p
          style={{ fontSize: "0.8rem" }}
          className="mb-1 text-monospace text-muted text-small"
        >
          Frage {question.questionID} - {question.category}
        </p>
        <h5>{question.questionText}</h5>
      </div>

      <div>
        <AnswerList onDiff={onDiff} diff={diff} answers={question.answers} />
      </div>
    </div>
  );
};
