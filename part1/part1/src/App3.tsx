import React, { useState } from 'react';

const Display = ({ left, right }: { left: number, right: number }): JSX.Element => (
  <div>
    <p>You have clicked left: {left} times.</p>
    <p>You have clicked right: {right} times.</p>
  </div>
);

const History = ({ history }: { history: string[] }): JSX.Element => (
  <p>{history.length > 0 ? `Click history: ${history.join(" ")}` : "This app is used by pressing the buttons"}</p>
);

const Button = (props: { text: string, onClick: () => void }): JSX.Element => (
  <button onClick={props.onClick}>{props.text}</button>
);

const App3 = (): JSX.Element => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const [history, setHistory] = useState<string[]>([]);

  const onLeftClick = (): void => {
    setClicks({ ...clicks, left: clicks.left + 1 });
    setHistory(history.concat("Left"));
  };

  const onRightClick = (): void => {
    setClicks({ ...clicks, right: clicks.right + 1 });
    setHistory(history.concat("Right"));
  };

  const onResetClick = (): void => {
    setClicks({ left: 0, right: 0 });
    setHistory([]);
  };

  return (
    <div>
      <Display left={clicks.left} right={clicks.right} />
      <Button text="Left" onClick={onLeftClick} />
      <Button text="Right" onClick={onRightClick} />
      <Button text="Reset" onClick={onResetClick} />
      <History history={history} />
    </div>
  );
};

export default App3;
