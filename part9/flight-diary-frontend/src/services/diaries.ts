import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const apiBaseUrl = "http://localhost:3000/api";

const getDiaries = async () => {
	try {
		const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);

		return data;
	} catch (error) {
		console.error("Failed to fetch diaries:", error);
		throw error;
	}
};

const addDiary = async (newDiaryEntry: NewDiaryEntry) => {
	const { data } = await axios.post(`${apiBaseUrl}/diaries`, newDiaryEntry);
	return data;
};

// add post service here

export default {
	getDiaries,
	addDiary,
};
