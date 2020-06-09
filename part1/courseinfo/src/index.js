import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.course}</h1>;
const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);
const Content = (props) => (
  <>
    <Part name={part1.name} exercises={part1.exercises} />
    <Part name={part2.name} exercises={part2.exercises} />
    <Part name={part3.name} exercises={part3.exercises} />
  </>
);
const Total = (props) => (
  <p>
    Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
  </p>
);
const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
