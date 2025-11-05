import { useState } from "react";

const Feedback = ({ name, onComment }) => {
  return <button onClick={onComment}>{name}</button>;
};
const Header = ({ content }) => {
  return <h1>{content}</h1>;
};
const StatDisplay = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  return (
    <>
      {total > 0 ? (
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>total {total}</p>
          <p>average {average}</p>
          <p>positive {positive} %</p>
        </>
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
      <Feedback name={"Good"} onComment={handleGoodFeedback} />
      <Feedback name={"Neutral"} onComment={handleNeutralFeedback} />
      <Feedback name={"Bad"} onComment={handleBadFeedback} />
      <Header content={"statistics"} />
      <StatDisplay good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
