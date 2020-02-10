import React from 'react';
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const showFiltered = persons.filter(person => person.name.includes(filter));

const rows = () => showFiltered.map(person =>
  <div>
    <Person key={person.id} person={person}/>
  </div>
)


filter by: <input value={filter} onChange={handleFilter}/>


export default Filter
