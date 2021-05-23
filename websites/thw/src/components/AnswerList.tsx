import React, { useState } from "react";

import { Answer as AnswerObject } from "../core/Answer";

import { Answer } from "./Answer";

export type AnswerListProps = {
  answers: AnswerObject[];
  diff?: boolean;
  onChange?: (updated: Map<AnswerObject, boolean>) => void;
  onDiff?: (isValid: boolean) => void;
};

export const AnswerList = (props: AnswerListProps) => {
  const { answers, diff, onDiff, onChange } = props;

  const [localAnswers, setLocalAnswers] = useState(
    answers.reduce(
      (all, answer) => all.set(answer, false),
      new Map<AnswerObject, boolean>()
    )
  );

  function findLocalAnswerByKey(key: string) {
    return Array.from(localAnswers.keys()).find((answer) => answer.key === key);
  }

  function findCurrentAnswerByKey(key: string) {
    return localAnswers.get(findLocalAnswerByKey(key)!);
  }

  const handleAnswerChange = (key: string, updatedValue: boolean) => {
    const changedAnswer = findLocalAnswerByKey(key);
    const updated = new Map(localAnswers).set(changedAnswer!, updatedValue);

    if (onChange != null) {
      onChange(updated);
    }

    setLocalAnswers(updated);
  };

  if (diff) {
    let isQuestionValid = true;

    const html = (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Lösung</th>
              <th>Eingabe</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody className="table-striped">
            {answers.map((answer) => {
              const providedAnswer = findCurrentAnswerByKey(answer.key);
              const correctAnswer = findLocalAnswerByKey(answer.key)
                ?.correctValue;

              const isCorrect = correctAnswer === providedAnswer;

              if (!isCorrect) {
                isQuestionValid = false;
              }

              return (
                <tr
                  className={isCorrect ? "table-success" : "table-danger"}
                  key={answer.key}
                >
                  <td>
                    <input type="checkbox" readOnly checked={correctAnswer} />
                  </td>
                  <td>
                    <input type="checkbox" readOnly checked={providedAnswer} />
                  </td>
                  <td style={{ fontSize: "0.8rem" }}>{answer.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

    if (typeof onDiff === "function") {
      onDiff(isQuestionValid);
    }

    return html;
  }

  return (
    <div>
      {answers.map((answer) => (
        <div key={answer.key}>
          <Answer onChange={handleAnswerChange} answer={answer} />
        </div>
      ))}
    </div>
  );
};
