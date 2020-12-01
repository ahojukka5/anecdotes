import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const onNext = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const onVote = () => {
    const copy = {...votes};
    copy[selected] = (copy[selected] || 0) + 1;
    setVotes(copy);
  };

  let maxVoteIndex = -1;
  let maxVote = 0;

  Object.keys(votes).forEach(key => {
    if (votes[key] > maxVote) {
      maxVoteIndex = key;
      maxVote = votes[key];
    }
  });

  console.log('votes', votes, 'maxVoteIndex ', maxVoteIndex);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected] || 0} votes</p>
      <Button onClick={onVote} text="vote" />
      <Button onClick={onNext} text="next anecdote" />
      <h1>Anecdote with most votes ({maxVote} votes)</h1>
      <p>{props.anecdotes[maxVoteIndex]}</p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
