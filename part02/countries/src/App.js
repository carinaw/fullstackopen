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

// Filter for the input field
    const handleFilter = (event) => {
      setFilter(event.target.value);
}
    const showFiltered = countries.filter(country => country.name.includes(filter));

// If logic to show country list and details.

    const showCountries = () => {
      if (showFiltered.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if
      (showFiltered.length > 1) {
        return (
    showFiltered.map(country =>
        <div>
          <Country key={country.alpha2code} country={country}/>
        </div>
      )) }
      else if
      (showFiltered.length === 1) {
        return (
        showFiltered.map(country =>
        <div>
          <h2>{country.name}</h2>
          <div>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
          </div>
          <div>
            <h3>languages</h3>
              <ul>
                {country.languages.map(lang => <li>{lang.name}</li>)}
              </ul>
            </div>
              <div>
                <img src={country.flag} alt="Country flag" height="100"/>
              </div>
        </div>
        )
      )
    }
  }


  return (
    <div>
      <h2>Country data</h2>
      <div>
      find countries: <input value={filter} onChange={handleFilter}/>
      </div>
    <div>
      Länderliste
      {showCountries()}
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
