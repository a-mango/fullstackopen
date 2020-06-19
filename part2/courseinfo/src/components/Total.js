import React from "react";

const Total = ({ parts }) => {
  let sum = 0;
  for(const part of parts) {
    sum += part.exercises
  }

  return <p><strong>Total of {sum} exercises</strong></p>;
};

export default Total;
