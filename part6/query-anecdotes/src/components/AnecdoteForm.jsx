import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationContext } from "../NotificationContext";

const AnecdoteForm = () => {
	const { state: message, dispatch } = useNotificationContext();

	const queryClient = useQueryClient();
	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
		},
		onError: (error) => {
			const errorMessage = error.response.data.error;
			dispatch({ type: "ERROR", payload: errorMessage });
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
