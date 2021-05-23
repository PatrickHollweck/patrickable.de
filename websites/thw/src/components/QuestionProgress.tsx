import React from "react";

type QuestionProgressProps = {
  correct: number;
  wrong: number;
  unanswered: number;
  total: number;
};

export const QuestionProgress = (props: QuestionProgressProps) => {
  const { correct, wrong, unanswered, total } = props;

  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: "33%" }}
        aria-valuenow={unanswered}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        {unanswered}x Unbeantwortet
      </div>

      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: "33%" }}
        aria-valuenow={correct}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        {correct}x Richtig
      </div>

      <div
        className="progress-bar bg-danger"
        role="progressbar"
        style={{ width: "33%" }}
        aria-valuenow={wrong}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        {wrong}x Falsch
      </div>
    </div>
  );
};
