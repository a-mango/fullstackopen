import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const Statistic = (props) => (
  <div>
    {props.label} {props.value}
  </div>
);

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  // If no feedback was given return informative component
  if (total <= 0) {
    return (
      <div>
        <Header text="statistics" />
        <p>No feedback given</p>
      </div>
    );
  }

  const average = () => (good - bad) / total;
  const percentage = () => `${(100 * good) / total} %`;

  return (
    <div>
      <Header text="statistics" />
      <Statistic label="good" value={good} />
      <Statistic label="neutral" value={neutral} />
      <Statistic label="bad" value={bad} />
      <Statistic label="all" value={total} />
      <Statistic label="average" value={average()} />
      <Statistic label="positive" value={percentage()} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <div>
        <Header text="give feedback" />
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
