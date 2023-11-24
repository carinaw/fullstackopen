import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchCountry, setSearchCountries] = useState("");

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => {
				setCountries(response.data);
			});
	}, []);
	console.log("show me the countries", countries);

	const countriesList = countries.map((country) => country.name.common);
	console.log(countriesList, "countriesList");

	const handleSearch = (event) => {
		setSearchCountries(event.target.value);
		console.log(event.target.value);
	};

	const filteredCountries = searchCountry
		? countriesList.filter((country) =>
				country.toLowerCase().includes(searchCountry.toLowerCase())
		  )
		: countriesList;
	console.log("filtered");

	return (
		<>
			<div>
				Find infos about country:{" "}
				<input value={searchCountry} onChange={handleSearch} />
			</div>
			<div>
				{filteredCountries.length < 10
					? filteredCountries.map((country) => <li>{country}</li>)
					: "Please enter a more specific search term!"}
			</div>
		</>
	);
};

export default App;
