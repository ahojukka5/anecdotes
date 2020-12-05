import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Divider, Container, Header, Segment } from 'semantic-ui-react';

import anecdotes from './data/anecdotes';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const onNext = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const onVote = () => {
    const copy = { ...votes };
    copy[selected] = (copy[selected] || 0) + 1;
    setVotes(copy);
  };

  let maxVoteIndex = -1;
  let maxVote = 0;

  Object.keys(votes).forEach((key) => {
    if (votes[key] > maxVote) {
      maxVoteIndex = key;
      maxVote = votes[key];
    }
  });

  console.log('votes', votes, 'maxVoteIndex ', maxVoteIndex);

  return (
    <div className="app">
      <Container text>
        <Divider hidden />
        <Header as="h1" attached="top" block>
          Anecdote of the day
        </Header>
        <Segment attached>
          <Header
            as="h4"
            style={{ minHeight: '9em', paddingTop: '1em', paddingLeft: '2em' }}
          >
            "{props.anecdotes[selected]}"
          </Header>
          <p>Anecdote has {votes[selected] || 0} votes.</p>
          <Divider />
          <Button onClick={onVote}>vote</Button>
          <Button onClick={onNext}>next</Button>
        </Segment>
        {maxVoteIndex !== -1 && (
          <>
            <Header as="h2" attached="top" block>
              Anecdote with most votes
            </Header>
            <Segment attached>
              <Header
                as="h4"
                style={{
                  minHeight: '9em',
                  paddingTop: '1em',
                  paddingLeft: '2em',
                }}
              >
                "{props.anecdotes[maxVoteIndex]}"
              </Header>
              <p>Anecdote has {maxVote} votes.</p>
            </Segment>
          </>
        )}
      </Container>
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
