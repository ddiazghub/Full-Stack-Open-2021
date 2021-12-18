import React, { useState } from 'react'

interface IStatistic {
  name: string,
  value: number,
  end?: string
};

const StatisticLine = (props: IStatistic): JSX.Element => (
  <tr>
    <td>{props.name}</td>
    <td>{props.value % 1 === 0 ? props.value: props.value.toFixed(2)} {props.end ? props.end : ""}</td>
  </tr>
);

const Statistics = (props: { data: IStatistic[] }): JSX.Element => (
  <table>
    <tbody>
      {props.data.map((statistic) => <StatisticLine name={statistic.name} value={statistic.value} end={statistic.end} />)}
    </tbody>
  </table>
);
  
const Button = (props: { text: string, onClick: () => void }): JSX.Element => (
  <button onClick={props.onClick}>{props.text}</button>
);

const App = (): JSX.Element => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total: number = good + bad + neutral;

  const statistics: IStatistic[] = [
    { name: "good", value: good },
    { name: "neutral", value: neutral },
    { name: "bad", value: bad },
    { name: "all", value: total },
    { name: "average", value: total > 0 ? (good - bad) / total : 0 },
    { name: "positive", value: total > 0 ? (good * 100) / total : 0, end: "%" }
  ];
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      {total !== 0 ? <Statistics data={statistics} /> : <p>No feedback given</p>}
    </div>
  )
}

export default App