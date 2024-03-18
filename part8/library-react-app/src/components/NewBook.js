import { useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, CREATE_BOOK } from "../queries";

const NewBook = ({ setError }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);
	const navigate = useNavigate();
	const padding = {
		padding: 10,
	};

	const [createBook] = useMutation(CREATE_BOOK, {
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join("\n");
			setError(messages);
		},
	});

	const submit = async (event) => {
		event.preventDefault();

		console.log("add book...", title, author, published, genres);

		createBook({ variables: { title, author, published, genres } });

		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			window.alert("New book added!");
			navigate("/books");
		},
		onError: (error) => console.error("Subscription error:", error),
	});

	return (
		<div style={padding}>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
