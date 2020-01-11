import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')


  const hook = () => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled');
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  console.log('render', countries.length, 'countries')




    const handleFilter = (event) => {
      setFilter(event.target.value);
}
    const showFiltered = countries.filter(country => country.name.includes(filter));

    const rows = () => showFiltered.map(country =>
      <div>
        <Country key={country.alpha2code} country={country}/>
      </div>
    )

  return (
    <div>
      <h2>Country data</h2>
      <div>
      find countries: <input value={filter} onChange={handleFilter}/>
      </div>
    <div>
      Länderliste
      {rows()}
    </div>
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <li key={country.id}>{country.name}</li>
    </div>
  )
}

export default App
