import React from 'react';
import './App.css';
import { useState } from 'react';

const App = ({person}) => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])

  const [ newName, setNewName ] = useState('')

// Whatever changes within the input field - it is set as a newName at that point.
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value);
  }



  const handleaddName = (event) => {
    event.preventDefault()


// Create an object called personObject where the value from the input field at time of submit click is stored.
    const personObject = {
      name: newName
    }

  // Add the personObject object that was created when button was clicked to the array persons using concat.
    setPersons(persons.concat(personObject))

// Clear newName state (and therefore field again)
    setNewName('')
  }

  const rows = () => persons.map(person =>
      <Person key={person.name} person={person}/>)



console.log('people', persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleaddName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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

const Person = ({person}) => {
  return (
    <li>{person.name}</li>
  )
}


export default App
