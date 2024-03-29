import axios from "axios";
import { Patient } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/diagnoses`);

	return data;
};

export default {
	getAll,
};
