import axios from "axios";
const baseURL = "http://localhost:3001/api/persons";

const getAll = () => {
	return axios.get(baseURL);
};

const create = (newPerson) => {
	return axios.post(baseURL, newPerson);
};

const deleteEntry = (id) => {
	return axios.delete(`${baseURL}/${id}`);
};

const update = (id, newPerson) => {
	return axios.put(`${baseURL}/${id}`, newPerson);
};

export default {
	getAll,
	create,
	deleteEntry,
	update,
};
