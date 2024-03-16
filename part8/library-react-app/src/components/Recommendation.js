import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

// change query

export const CURRENT_USER = gql`
	query {
		me {
			favoriteGenre
		}
	}
`;

export const RECOMMENDATION = gql`
	query GetFavoriteGenreBooks($genre: String) {
		allBooks(genre: $genre) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`;

const Recommendation = () => {
	const [favoriteGenre, setFavoriteGenre] = useState(null);

	const { loading: userLoading, data: userData } = useQuery(CURRENT_USER);
	console.log(userData, "userData");

	useEffect(() => {
		if (userData) {
			setFavoriteGenre(userData.me.favoriteGenre);
		}
	}, [userData]);

	const { loading: booksLoading, data: booksData } = useQuery(RECOMMENDATION, {
		skip: !favoriteGenre,
		variables: { genre: favoriteGenre || null },
	});

	const padding = {
		padding: 10,
	};
	console.log(booksData, "booksData");

	if (userLoading || booksLoading) {
		return <div>is loading...</div>;
	}
	console.log(booksData, "booksData");

	return (
		<div style={padding}>
			<h2>recommendations</h2>
			<p>books of your favorite genre</p>
			<table>
				<tbody>
					<tr>
						<th>title</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksData &&
						booksData.allBooks.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommendation;
