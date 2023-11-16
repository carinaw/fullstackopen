import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

	const [newName, setNewName] = useState("");

	const addName = (event) => {
		event.preventDefault();
		console.log("button clicked", event.target);
		const newPerson = {
			name: newName,
			id: persons.length + 1,
		};
		setPersons(persons.concat(newPerson));
		setNewName("");

		const isAlreadyAdded = persons.find((person) => person.name === newName);
		console.log("is it there", isAlreadyAdded);

		if (isAlreadyAdded === undefined) {
			console.log("is it there", isAlreadyAdded);
		} else alert(`${newName} is already in the phonebook!`);
	};

	const handleNameAddition = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				<form onSubmit={addName}>
					<div>
						name: <input value={newName} onChange={handleNameAddition} />
					</div>
					<div>
						<button type="submit">add</button>
					</div>
				</form>
			</div>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.id}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
