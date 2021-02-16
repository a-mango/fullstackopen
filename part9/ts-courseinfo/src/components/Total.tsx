import React from "react";

interface TotalProps {
  exercisesCount: number;
}

const Total: React.FC<TotalProps> = (props) => {
  return <p>Total number of exercises: {props.exercisesCount}</p>;
};

export default Total;
