import React from "react";

export const EvalBar = ({ evaluation }) => {
  const sigmoid = (x, min, max) =>
    Math.min(Math.max(1 / (1 + Math.exp(-x)), min), max);
  return (
    <>
      <div className="h-100 w-5 bg-gray-500">
        <div
          className="h-100 w-full bg-gray-300"
          style={{ height: `${sigmoid(evaluation, 0.2, 0.9) * 100}%` }}
        ></div>
      </div>
    </>
  );
};
//const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
