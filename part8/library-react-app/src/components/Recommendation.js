import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { CURRENT_USER, RECOMMENDATION } from "../queries";

// change query

const Recommendation = () => {
	const [favoriteGenre, setFavoriteGenre] = useState(null);

	const { loading: userLoading, data: userData } = useQuery(CURRENT_USER, {
		fetchPolicy: "cache-first",
	});
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
