import React, { useState } from 'react';

const App = (): JSX.Element => {
  const anecdotes: string[] = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
   
  const [selected, setSelected] = useState<number>(0);
  const [votes, setVotes] = useState<number[]>(new Array<number>(anecdotes.length).fill(0));

  const nextAnecdote = (): number => {
    let next: number = Math.floor(Math.random() * anecdotes.length);
    return next !== selected ? next : nextAnecdote();
  };

  const voteFor = (selected: number): void => {
    let updatedVotes: number[] = [...votes];
    updatedVotes[selected]++;
    setVotes(updatedVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => voteFor(selected)}>vote</button>
      <button onClick={() => setSelected(nextAnecdote())}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.reduce((max, current, index) => current > votes[max] ? index : max, 0)]}</p>
    </div>
  )
}

export default App;