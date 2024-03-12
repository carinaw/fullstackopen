import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_BOOKS } from "./Books";
import { ALL_AUTHORS } from "./Authors";

const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: String!
		$genres: [String]
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`;

const NewBook = ({ setError }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

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
