import { useDispatch, useSelector } from "react-redux";
import { voteThisA } from "../reducers/anecdoteReducer";
import {
	showNotification,
	hideNotification,
} from "../reducers/notificationReducer";

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
		dispatch(voteThisA({ id }));

		const notification = `You voted for "${content}"`;
		dispatch(showNotification(notification));
		setTimeout(() => {
			dispatch(hideNotification());
		}, 5000);
	};

	const sortedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

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
