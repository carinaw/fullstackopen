import { useState, useEffect, SyntheticEvent } from "react";
import diaryService from "./services/diaries";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import axios from "axios";

const App = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	const [entryDate, setEntryDate] = useState("");
	const [visibilityInfo, setVisibilityInfo] = useState("");
	const [weatherInfo, setWeatherInfo] = useState("");
	const [entryComment, setEntryComment] = useState("");

	const errorStyle = {
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: "pink",
	};

	const addEntry = async (event: SyntheticEvent) => {
		console.log(entryDate, typeof entryDate);

		event.preventDefault();
		const newEntry: NewDiaryEntry = {
			date: entryDate,
			visibility: visibilityInfo as Visibility,
			weather: weatherInfo as Weather,
			comment: entryComment,
		};

		try {
			await diaryService.addDiary(newEntry);
			const updatedDiaries = await diaryService.getDiaries();
			setDiaries(updatedDiaries);
			console.log(newEntry, "newEntry");
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				console.error("Axios error response:", error.response);
				// log response first to see the object and understand where to extract the message from.

				const serverErrorMessage =
					error.response.data ||
					"An unexpected error occurred. Please try again.";

				setErrorMessage(serverErrorMessage);
				setTimeout(() => {
					setErrorMessage("");
				}, 5000);
			} else {
				console.error("Non-Axios error:", error);
				setErrorMessage("An unexpected error occurred. Please try again.");
				setTimeout(() => {
					setErrorMessage("");
				}, 5000);
			}
		}
	};

	useEffect(() => {
		diaryService.getDiaries().then((data) => {
			setDiaries(data);
		});
	}, []);

	return (
		<>
			<h2>add new diary entry</h2>
			{errorMessage && <div style={errorStyle}>{errorMessage}</div>}
			<form onSubmit={addEntry}>
				<div>
					date:{" "}
					<input
						type="date"
						value={entryDate}
						onChange={({ target }) => setEntryDate(target.value)}
					/>
				</div>
				<div>
					visibility:{" "}
					{/* <input
						value={visibilityInfo}
						// you need to convert
						onChange={({ target }) => setVisibilityInfo(target.value)}
					/> */}
					great
					<input
						type="radio"
						value="great"
						name="visibilityInfo"
						checked={visibilityInfo === "great"}
						onChange={({ target }) => setVisibilityInfo(target.value)}
					/>
					good
					<input
						type="radio"
						value="good"
						name="visibilityInfo"
						checked={visibilityInfo === "good"}
						onChange={({ target }) => setVisibilityInfo(target.value)}
					/>
					ok
					<input
						type="radio"
						value="ok"
						name="visibilityInfo"
						checked={visibilityInfo === "ok"}
						onChange={({ target }) => setVisibilityInfo(target.value)}
					/>
					poor
					<input
						type="radio"
						value="poor"
						name="visibilityInfo"
						checked={visibilityInfo === "poor"}
						onChange={({ target }) => setVisibilityInfo(target.value)}
					/>
				</div>
				<div>
					weather:{" "}
					{/* <input
						value={weatherInfo}
						onChange={({ target }) => setWeatherInfo(target.value)}
					/> */}
					sunny
					<input
						name="weatherInfo"
						value="sunny"
						type="radio"
						checked={weatherInfo === "sunny"}
						onChange={({ target }) => setWeatherInfo(target.value)}
					/>
					rainy{" "}
					<input
						name="weatherInfo"
						value="rainy"
						type="radio"
						checked={weatherInfo === "rainy"}
						onChange={({ target }) => setWeatherInfo(target.value)}
					/>
					cloudy{" "}
					<input
						name="weatherInfo"
						value="cloudy"
						type="radio"
						checked={weatherInfo === "cloudy"}
						onChange={({ target }) => setWeatherInfo(target.value)}
					/>
					stormy{" "}
					<input
						name="weatherInfo"
						value="stormy"
						type="radio"
						checked={weatherInfo === "stormy"}
						onChange={({ target }) => setWeatherInfo(target.value)}
					/>
					windy{" "}
					<input
						name="weatherInfo"
						value="windy"
						type="radio"
						checked={weatherInfo === "windy"}
						onChange={({ target }) => setWeatherInfo(target.value)}
					/>
				</div>
				<div>
					comment:{" "}
					<input
						value={entryComment}
						onChange={({ target }) => setEntryComment(target.value)}
					/>
				</div>
				<button type="submit">add</button>
			</form>
			<h2>diary entries</h2>
			{diaries.map((diary, id) => {
				return (
					<div key={id}>
						<h4>{diary.date}</h4>
						<p>visibility: {diary.visibility}</p>
						<p>weather: {diary.weather}</p>
						<p>comment: {diary.comment}</p>
					</div>
				);
			})}
		</>
	);
};

export default App;
