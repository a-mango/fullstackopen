import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({text}) => <h2>{text}</h2>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <div>{text}</div>
      <div>has {votes} vote</div>
    </div>
  );
};


const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const random = () => Math.round(Math.random() * (anecdotes.length - 1));
  const mostVotes = () => votes.indexOf(Math.max(...votes))

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };


  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={() => setSelected(random())} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[mostVotes()]} votes={votes[mostVotes()]} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
