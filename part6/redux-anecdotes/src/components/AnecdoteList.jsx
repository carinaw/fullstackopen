import { useDispatch, useSelector } from "react-redux";
import { voteThisA } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleVote }) => {
	console.log(anecdote, "passed anecdote");
	return (
		<div key={anecdote.id}>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleVote}>vote</button>
			</div>
		</div>
	);
};

const AnecdoteList = () => {
	const dispatch = useDispatch();

	const anecdotes = useSelector(({ filter, anecdotes }) => {
		const filteredList = filter
			? anecdotes.filter((anecdote) =>
					anecdote.content.toLowerCase().includes(filter.toLowerCase())
			  )
			: anecdotes;
		return filteredList;
	});

	const sortedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

	return (
		<div>
			{sortedByVotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleVote={() => dispatch(voteThisA(anecdote.id))}
				/>
			))}
		</div>
	);
};

export default AnecdoteList;
