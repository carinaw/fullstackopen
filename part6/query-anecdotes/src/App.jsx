import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationContext } from "./NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
	const { state: message, dispatch } = useNotificationContext();

	const queryClient = useQueryClient();

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
		retry: 1,
	});

	console.log(JSON.parse(JSON.stringify(result)));

	const updateAnecdoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
		},
	});

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
		console.log("vote");
		dispatch({ type: "VOTE", payload: anecdote.content });
	};

	if (result.isLoading) {
		return <div>loading anecdotes...</div>;
	}

	if (result.isError) {
		return <div>anecdote service not available due to server problems...</div>;
	}

	const anecdotes = result.data;

	const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{sortedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};
export default App;
