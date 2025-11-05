import { useState } from "react";

const Anecdote = ({ isOfTheDay, quote, children }) => {
  return (
    <div>
      {isOfTheDay ? (
        <h1>Anecdote of the day</h1>
      ) : (
        <h1>Anecdote with most votes</h1>
      )}
      <p>{quote}</p>
      {children}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const len = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(len).fill(0));
  const [mostVotes, setMostVotes] = useState(-1);
  
  const quote = anecdotes[selected]
  const vote = votes[selected]
  
  const handleNextAnecdote = () => {
    let index = Math.floor(Math.random() * len);
    while (index == selected) {
      index = Math.floor(Math.random() * len);
    }
    setSelected(index);
  };
  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    if (newVotes[selected] > newVotes[mostVotes] || mostVotes === -1) {
      setMostVotes(selected);
    }
    setVotes(newVotes);
  };
  return (
    <div>
      <Anecdote quote={quote} isOfTheDay={true}>
        <p>Votes: {vote}</p>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleNextAnecdote}>next Anectode</button>
      </Anecdote>
      {mostVotes !== -1 && (
        <Anecdote quote={anecdotes[mostVotes]} isOfTheDay={false} />
      )}
    </div>
  );
};

export default App;
