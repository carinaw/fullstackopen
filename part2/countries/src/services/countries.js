import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";
const apiKey = "e9b3651426e94730f5216df3e09406db";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";

const getAll = () => {
	const request = axios.get(`${baseURL}/all`);
	return request.then((response) => response.data);
};

const getOne = (searchCountry) => {
	const request = axios.get(`${baseURL}/name/${searchCountry}`);
	return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
	const request = axios.get(
		`${weatherURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
	);
	return request.then((response) => response.data);
};

export default { getAll, getOne, getWeather };
