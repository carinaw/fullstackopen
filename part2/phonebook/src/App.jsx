import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import personService from "./services/phonebook";
import "./index.css";

const Notification = ({ successMessage, errorMessage }) => {
	if (!successMessage && !errorMessage) {
		return null;
	}
	return (
		<div className={`${successMessage ? "success" : "error"}`}>
			{successMessage ? successMessage : errorMessage}
		</div>
	);
};

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
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const addPerson = (event) => {
		event.preventDefault();
		console.log("button clicked", event.target);

		const isAlreadyAdded = persons.find((person) => person.name === newName);

		console.log("is it there?", isAlreadyAdded);

		if (isAlreadyAdded) {
			confirm(
				`${newName} is already in the phonebook! Do you want to update the number?`
			);

			console.log("now");

			personService
				.update(isAlreadyAdded.id, { ...isAlreadyAdded, number: newNumber })
				.then((response) => {
					console.log(response);
					setPersons(
						persons.map((person) =>
							person.id !== isAlreadyAdded.id ? person : response.data
						)
					);
					setSuccessMessage(`Number of ${isAlreadyAdded.name} updated.`);
					setTimeout(() => {
						setSuccessMessage(null);
					}, 5000);
				})
				.catch((error) => {
					setErrorMessage(
						`The contact ${isAlreadyAdded.name} has already been removed and can't be updated.`
					);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				});
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			};
			personService.create(newPerson).then((response) => {
				console.log(response);
				setPersons(persons.concat(response.data));
				setNewName("");
				setNewNumber("");
				setSuccessMessage(`Added new contact: ${newPerson.name}`);
				setTimeout(() => {
					setSuccessMessage(null);
				}, 5000);
			});
		}
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
				setSuccessMessage(`Contact deleted.`);
				setTimeout(() => {
					setSuccessMessage(null);
				}, 5000);
			});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
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
