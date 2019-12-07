import React from 'react';
import './App.css';
import { useState } from 'react';

const App = ({person}) => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '0452345401'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

// Whatever changes within the input field - it is set as a newName at that point.
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value);
  }

  const handlePhoneNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value);
  }

  const handleaddInfo = (event) => {
    event.preventDefault()

  // Create an object called personObject where the value from the input field at time of submit click is stored.
      const personObject = {
        name: newName,
        number: newNumber
      };

  // Use map for a reason I still need to comprehend and show alert if newName is already in the array.
    const allNames = persons.map(person => person.name)
     if (allNames.includes(newName, 0) === true) {
     window.alert(`${newName} is already on the list!`) }
     else {
// Add the personObject object that was created when button was clicked to the array persons using concat.
       setPersons(persons.concat(personObject));
  // Clear newName state (and therefore field again)
      setNewName('')
      setNewNumber('')
    };
};

    const handleFilter = (event) => {
      setFilter(event.target.value);
}
    const showFiltered = persons.filter(person => person.name.includes(filter));

    const rows = () => showFiltered.map(person =>
      <div>
        <Person key={person.name} person={person}/>
      </div>
    )


console.log('people', persons);
console.log('filter', filter);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      filter by: <input value={filter} onChange={handleFilter}/>
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
      <div>
        {rows()}
      </div>
    </div>
  )
}

const Person = ({person, number}) => {
  return (
    <div>
    <li>{person.name} {person.number}</li>

    </div>
  )
}

export default App
