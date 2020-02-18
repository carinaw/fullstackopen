import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = ({ person }) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  console.log("render", persons.length, "persons");
  // Whatever changes within the input field - it is set as a newName at that point.
  const handleNameChange = event => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const handlePhoneNumber = event => {
    setNewNumber(event.target.value);
    console.log(event.target.value);
  };

  const createPerson = personObject => {
    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleaddInfo = event => {
    event.preventDefault();

    // Create an object called personObject where the value from the input field at time of submit click is stored.
    const personObject = {
      name: newName,
      number: newNumber
    };

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson && window.confirm("Do you want to update?")) {
      personService
        .update(existingPerson.id, personObject)
        .then(returnedPerson);
      // Filter & create (use delete & create)
    }
    createPerson(personObject);
  };
  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const showFiltered = persons.filter(person => person.name.includes(filter));

  const rows = () =>
    showFiltered.map(person => (
      <div>
        <Person
          key={person.id}
          person={person}
          handleDelete={() =>
            handleDelete(person.id, person.name, person.number)
          }
        />
      </div>
    ));

  const handleDelete = (id, newName, personObject) => {
    if (window.confirm(`Do you really want to delete ${newName}?`)) {
      personService
        .deleteContact(id)
        .then(setPersons(persons.filter(person => person.id !== id)));
    }
  };

  console.log("people", persons);
  console.log("filter", filter);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter by: <input value={filter} onChange={handleFilter} />
      </div>
      <form onSubmit={handleaddInfo}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhoneNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{rows()}</div>
    </div>
  );
};

const Person = ({ person, number, handleDelete }) => {
  return (
    <div>
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={handleDelete}>delete</button>
      </li>
    </div>
  );
};

export default App;
