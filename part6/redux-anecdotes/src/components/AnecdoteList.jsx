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
	const anecdotes = useSelector((state) => state);

	const sortedAs = anecdotes.sort((a, b) => b.votes - a.votes);

	return (
		<div>
			{sortedAs.map((anecdote) => (
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
