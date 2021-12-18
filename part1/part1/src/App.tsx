import React, { useState } from 'react';

const Display = ({ counter }: { counter: number }): JSX.Element => (
  <div>You have clicked {counter} times.</div>
);

const Button = (props: { text: string, onClick: () => void }): JSX.Element => (
  <button onClick={props.onClick}>{props.text}</button>
);

const App = (): JSX.Element => {
  const [counter, setCounter] = useState(0);

  const updateCounter = (value: number): (() => void) => (
    () => setCounter(value)
  );

  return (
    <div>
      <Display counter={counter} />
      <Button text="Increment" onClick={updateCounter(counter + 1)} />
      <Button text="Decrement" onClick={updateCounter(counter - 1)} />
      <Button text="Reset" onClick={updateCounter(0)} />
    </div>
  );
}

export default App;
