import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "./Books";
import Select from "react-select";
import AsyncSelect from "react-select/async";

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

const UPDATE_AUTHOR = gql`
	mutation updateAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`;

const Authors = ({ setError }) => {
	const [selectedAuthor, setSelectedAuthor] = useState(null);

	const [name, setName] = useState("");
	const [setBornTo, setSetBornTo] = useState("");

	const result = useQuery(ALL_AUTHORS);

	const padding = {
		padding: 10,
	};

	const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join("\n");
			setError(messages);
		},
	});

	const submit = async (event) => {
		event.preventDefault();

		const setBornToAsInt = parseInt(setBornTo);

		updateAuthor({
			variables: { name: selectedAuthor.value, setBornTo: setBornToAsInt },
		});

		setName("");
		setSetBornTo("");
	};

	const authorOptions = result.data?.allAuthors.map((author) => ({
		value: author.name,
		label: author.name,
	}));

	if (result.loading) {
		return <div>is loading...</div>;
	}

	return (
		<div style={padding}>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{result.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<h2>set birth year</h2>
				<form onSubmit={submit}>
					<div>
						<Select
							options={authorOptions}
							value={selectedAuthor}
							onChange={setSelectedAuthor}
							placeholder="Choose author"
						/>
					</div>
					<div>
						born:{" "}
						<input
							type="number"
							value={setBornTo}
							onChange={({ target }) => setSetBornTo(target.value)}
						/>
					</div>
					<button type="submit">submit</button>
				</form>
			</div>
		</div>
	);
};

export default Authors;
