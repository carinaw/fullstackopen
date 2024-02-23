import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotification } from "../NotificationContext";

const AnecdoteForm = () => {
	const { state: message, dispatch } = useNotification();

	const queryClient = useQueryClient();
	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		console.log("new anecdote");
		newAnecdoteMutation.mutate({ content, votes: 0 });
		dispatch({ type: "ADD", payload: content });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
