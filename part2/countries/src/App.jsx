import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import countryService from "./services/countries.js";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchCountry, setSearchCountries] = useState("");
	const [countryInfo, setCountryInfo] = useState(null);
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		countryService.getAll().then((countryData) => {
			const countriesList = countryData.map((country) => country.name.common);
			setCountries(countriesList);
			console.log(countries, "countries");
		});
	}, []);

	useEffect(() => {
		// searchCountry has any value
		if (searchCountry) {
			console.log("searchCountry value:", searchCountry);
			countryService
				.getOne(searchCountry)
				.then((country) => {
					// response (country) triggers either setting countryInfo to one object or to null
					console.log("log", country);
					if (country && country.name && country.name.common) {
						setCountryInfo(country);
					} else {
						setCountryInfo(null);
					}
				})
				.catch((error) => {
					console.log("Not a full country name");
				});
		}
		// Trigger render every time searchCountry has a value, which means we need error handling
	}, [searchCountry]);

	useEffect(() => {
		if (countryInfo) {
			countryService
				.getWeather(
					countryInfo.capitalInfo.latlng[0],
					countryInfo.capitalInfo.latlng[1]
				)
				.then((weather) => {
					setWeatherData(weather);
					console.log(weatherData, "weather");
				});
		}
	}, [countryInfo]);

	const handleSearch = (event) => {
		setSearchCountries(event.target.value);
		console.log(event.target.value);
	};

	const handleCountryClick = (countryName) => {
		console.log("log click");
		countryService
			.getOne(countryName)
			.then((country) => setCountryInfo(country));
	};

	const filteredCountries = searchCountry
		? countries.filter((country) =>
				country.toLowerCase().includes(searchCountry.toLowerCase())
		  )
		: [countries];

	const weatherIconURL = "https://openweathermap.org/img/wn";

	return (
		<>
			<div>
				Find infos about country:{" "}
				<input value={searchCountry} onChange={handleSearch} />
			</div>
			<div>
				{filteredCountries.length > 10 &&
					"Please enter a more specific search term!"}
				{filteredCountries.length <= 10 && filteredCountries.length > 1 && (
					<ul>
						{filteredCountries.map((country) => (
							<li key={country}>
								{country}{" "}
								<button
									onClick={() => {
										handleCountryClick(country);
									}}
								>
									Details
								</button>
							</li>
						))}
					</ul>
				)}
				{countryInfo && (
					<div>
						<h2>{countryInfo.name.common}</h2>
						<p>Capital: {countryInfo.capital[0]}</p>
						<p>Area: {countryInfo.area} km2</p>
						<img src={countryInfo.flags.png} alt={`Flag of country`} />
						<h3>Official languages</h3>
						<ul>
							{Object.values(countryInfo.languages).map((language) => (
								<li key={language}>{language}</li>
							))}
						</ul>{" "}
					</div>
				)}

				{weatherData && (
					<div>
						<h2>Weather in {countryInfo.name.common}:</h2>
						<p>Temperature: {weatherData.main.temp.toFixed(1)} Celsius</p>
						<img
							src={`${weatherIconURL}/${weatherData.weather[0].icon}@2x.png`}
							alt={"Weather icon"}
						/>
						<p>Wind: {weatherData.wind.speed} m/s</p>
					</div>
				)}
			</div>
		</>
	);
};

export default App;
