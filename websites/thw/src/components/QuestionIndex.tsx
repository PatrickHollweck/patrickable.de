import React from "react";

import { Question } from "../core/Question";
import { useElementID } from "../hooks/useElementID";
import { QuestionStorage } from "../core/QuestionStorage";

export type QuestionIndexProps = {
  questions: Question[];
  onSelect: (question: Question) => void;
};

export const QuestionIndex = (props: QuestionIndexProps) => {
  const { questions, onSelect } = props;

  const collapseID = useElementID("questionIndex");

  const handleSelect = (question: Question) => {
    // @ts-ignore
    $(`#${collapseID}`).collapse("hide");
    onSelect(question);
  };

  return (
    <div>
      <button
        className="btn btn-light btn-outline-dark container-fluid text-left mb-3"
        type="button"
        data-toggle="collapse"
        data-target={`#${collapseID}`}
        aria-expanded="false"
        aria-controls={`#${collapseID}`}
      >
        <i className="fas fa-list mr-3"></i>
        Fragen Index
      </button>
      <div className="collapse  mb-4" id={collapseID}>
        <div className="card card-body">
          <h4 className="card-title">Frage auswählen um diese zu aktivieren</h4>
          {questions.map((question) => (
            <button
              key={question.questionID}
              onClick={() => handleSelect(question)}
              className={`btn text-left ${
                !question.storage.hasSavedAnswer()
                  ? "text-secondary"
                  : question.storage.getSavedAnswer()
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {question.questionID} - {question.questionText}
              <hr className="mt-0 mb-0" />
            </button>
          ))}
          <button
            onClick={() => QuestionStorage.reset()}
            className="btn btn-danger"
          >
            Statistiken zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
};
