import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { CoursePart } from "./utils/types";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "On brewing coffee",
      exerciseCount: 13,
      description: "Learn to brew coffee the 2.0 way",
      duration: "6 weeks",
    },
  ];
  const exercisesCount = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header title={courseName} />
      <Content parts={courseParts} />
      <Total exercisesCount={exercisesCount} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
