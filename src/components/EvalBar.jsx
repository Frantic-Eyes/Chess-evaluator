import React from "react";

export const EvalBar = ({ evaluation }) => {
  const sigmoid = (x, min, max) =>
    Math.min(Math.max(1 / (1 + Math.exp(-x)), min), max);
  return (
    <>
      <div>EvalBar : {sigmoid(evaluation, 0.2, 0.9)}</div>
    </>
  );
};
//const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
