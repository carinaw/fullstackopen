import { useDispatch } from "react-redux";
import { createA } from "../reducers/anecdoteReducer";
import {
	hideNotification,
	showNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		const newAnecdote = await anecdoteService.create(content);
		// Await before dispatching, to make sure the note exists before trying to update the state with it.
		dispatch(createA(newAnecdote));
		console.log(content, "content!");
		dispatch(showNotification(`You created the new note "${content}"`));
		setTimeout(() => {
			dispatch(hideNotification());
		}, 5000);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
