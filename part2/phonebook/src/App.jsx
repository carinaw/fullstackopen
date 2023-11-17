import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "0448282" },
		{ name: "Makani", number: "02593892" },
		{ name: "Carina", number: "04591345" },
		{ name: "Niklas", number: "0294892" },
	]);

	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setFiltered] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
		console.log("button clicked", event.target);
		const newPerson = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		setPersons(persons.concat(newPerson));
		setNewName("");
		setNewNumber("");

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

	const handleNumberAddition = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilter = (event) => {
		setFiltered(event.target.value);
	};

	// Remember, this is an array too
	const filtered = newFilter
		? persons.filter((p) =>
				p.name.toLowerCase().includes(newFilter.toLowerCase())
		  )
		: persons;

	console.log(persons);

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				<Filter newFilter={newFilter} handleFilter={handleFilter} />
				<PersonForm
					addPerson={addPerson}
					newName={newName}
					handleNameAddition={handleNameAddition}
					newNumber={newNumber}
					handleNumberAddition={handleNumberAddition}
				/>
			</div>
			<ContactList filtered={filtered} />
		</div>
	);
};

const Contact = ({ filter }) => {
	return (
		<p key={filter.id}>
			{filter.name} {filter.number}
		</p>
	);
};

export default App;
