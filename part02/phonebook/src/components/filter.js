import React from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';


const showFiltered = persons.filter(person => person.name.includes(filter));

const rows = () => showFiltered.map(person =>
  <div>
    <Person key={person.name} person={person}/>
  </div>
)


filter by: <input value={filter} onChange={handleFilter}/>


export default Filter
