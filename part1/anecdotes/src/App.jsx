import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);

	// random selection
	const random = Math.random();
	const totalArray = anecdotes.length;
	const randomIndex = Math.floor(random * totalArray);
	// console.log(randomIndex);

	const votesArray = Array(totalArray).fill(0);
	console.log(votesArray);
	const [votes, setVotes] = useState(votesArray);

	//handlers;
	const handleRandomClick = () => {
		setSelected(randomIndex);
		console.log("selected", selected);
	};

	const handleVote = () => {
		const newVotes = [...votes];
		newVotes[selected] += 1;
		setVotes(newVotes);
		console.log("newVotes", newVotes);
		console.log("votes", votes);
	};
	return (
		<div>
			<h1>anecdote of the day</h1>
			<div>
				<p>{anecdotes[selected]}</p>
				<p>has {votes[selected]} votes</p>
				<div>
					<button onClick={handleVote}>vote</button>
					<button onClick={handleRandomClick}>new anecdote</button>
				</div>
			</div>
			<h1>best anecdote</h1>
		</div>
	);
};

export default App;
