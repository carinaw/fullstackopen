import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
	return axios.get(baseURL);
};

const create = (newPerson) => {
	return axios.post(baseURL, newPerson);
};

const deleteEntry = (id) => {
	return axios.delete(`${baseURL}/${id}`);
};

export default {
	getAll,
	create,
	deleteEntry,
};
