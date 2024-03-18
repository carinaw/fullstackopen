import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, GET_BOOKS_BY_GENRE } from "../queries";

const Books = () => {
	const [selectedGenre, setSelectedGenre] = useState("");

	const result = useQuery(
		ALL_BOOKS,
		(GET_BOOKS_BY_GENRE, { variables: { genre: selectedGenre || null } })
	);

	const padding = {
		padding: 10,
	};

	const genreList = {
		margin: 4,
		padding: 4,
	};

	if (result.loading) {
		return <div>is loading...</div>;
	}

	const allGenres = result.data.allBooks
		.map((book) => book.genres) // get all genres
		.flat() // flat into array
		.filter((genre, index, self) => self.indexOf(genre) === index); // filter for uniqueness

	const filterGenre = (genre) => {
		setSelectedGenre(genre);
	};

	const filteredBooks = selectedGenre
		? result.data.allBooks.filter((book) => book.genres.includes(selectedGenre))
		: result.data.allBooks;

	return (
		<div style={padding}>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filteredBooks.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div style={padding}>
				{" "}
				{allGenres.map((genre, index) => (
					<button
						style={genreList}
						key={index}
						onClick={() => filterGenre(genre)}
					>
						{genre}
					</button>
				))}
				<button style={genreList} onClick={() => setSelectedGenre("")}>
					show all
				</button>
			</div>
		</div>
	);
};

export default Books;
