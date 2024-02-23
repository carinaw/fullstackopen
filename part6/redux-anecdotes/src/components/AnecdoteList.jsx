import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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

	const handleVote = (id, content) => {
		event.preventDefault();
		dispatch(vote(id));
		dispatch(setNotification(`You voted for '${content}'`, 10));
	};

	const sortedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

	console.log("this is my array check", sortedByVotes);

	return (
		<div>
			{sortedByVotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleVote={() => handleVote(anecdote.id, anecdote.content)}
				/>
			))}
		</div>
	);
};

export default AnecdoteList;
