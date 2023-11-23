import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import personService from "./services/phonebook";

const App = () => {
	useEffect(() => {
		console.log("what's happening");
		personService.getAll().then((response) => {
			console.log("show me");
			setPersons(response.data);
		});
	}, []);

	const [persons, setPersons] = useState([]);
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

		const isAlreadyAdded = persons.find((person) => person.name === newName);
		console.log("is it there", isAlreadyAdded);

		if (isAlreadyAdded === undefined) {
			console.log("is it there", isAlreadyAdded);
		} else alert(`${newName} is already in the phonebook!`);

		personService.create(newPerson).then((response) => {
			console.log(response);
			setPersons(persons.concat(response.data));
			setNewName("");
			setNewNumber("");
		});
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
	console.log("filtered", filtered);

	// Delete entry
	const handleDelete = (id) => {
		console.log("now delete", id);
		const deleteName = persons.find((person) => person.id === id);
		if (confirm(`Do you really want to delete ${deleteName.name}?`)) {
			personService.deleteEntry(id).then(() => {
				const newList = persons.filter((p) => p.id !== id);
				setPersons(newList);
			});
		}
	};

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
			<ContactList filtered={filtered} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
