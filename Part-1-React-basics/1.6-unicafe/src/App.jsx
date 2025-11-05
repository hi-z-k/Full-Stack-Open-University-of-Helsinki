import { useState } from "react";

const Button = ({ name, onComment }) => {
  return <button onClick={onComment}>{name}</button>;
};
const Header = ({ content }) => {
  return <h1>{content}</h1>;
};

const StatisticLine = ({ text, value, end = "" }) => (
  <tr className="data-row">
    <td>{text}</td>
    <td>
      {value} {end}
    </td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  return (
    <>
      {total > 0 ? (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"total"} value={total} />
            <StatisticLine text={"average"} value={average} />
            <StatisticLine text={"positive"} value={positive} end="%" />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = () => {
    setGood(good + 1);
  };
  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };
  const handleBadFeedback = () => {
    setBad(bad + 1);
  };
  return (
    <div>
      <Header content={"give feedback"} />
      <Button name={"Good"} onComment={handleGoodFeedback} />
      <Button name={"Neutral"} onComment={handleNeutralFeedback} />
      <Button name={"Bad"} onComment={handleBadFeedback} />
      <Header content={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
