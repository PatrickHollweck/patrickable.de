import React, { useState } from "react";

import { Answer as AnswerObject } from "../core/Answer";

import { useElementID } from "../hooks/useElementID";

type AnswerProps = {
  answer: AnswerObject;
  onChange: (key: string, newValue: boolean) => void;
};

export const Answer = (props: AnswerProps) => {
  const { answer, onChange } = props;

  const [checked, setChecked] = useState(false);
  const elementID = useElementID("answer");

  const handleChange = (e: React.MouseEvent) => {
    e.preventDefault();

    onChange(answer.key, !checked);
    setChecked(!checked);
  };

  return (
    <div
      onClick={handleChange}
      style={{
        background: checked ? "#CBD1F9" : "#E9ECFF",
        borderRadius: "2px",
        padding: "1em",
      }}
      className="mb-3"
    >
      <input
        readOnly
        style={{ pointerEvents: "none" }}
        id={elementID}
        type="checkbox"
        checked={checked}
      />

      <label className="ml-3 d-inline" htmlFor={elementID}>
        {answer.text}
      </label>
    </div>
  );
};
