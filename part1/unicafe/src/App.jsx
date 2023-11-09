import { useState } from "react";

const Statistics = (props) => {
	return (
		<div>
			<h2>{props.name}</h2>
			<p>good: {props.good}</p>
			<p>neutral: {props.neutral}</p>
			<p>bad: {props.bad}</p>
			<p>total: {props.total}</p>
			<p>average: {props.average}</p>
			<p>positive: {props.positive}%</p>
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [bad, setBad] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [total, setTotal] = useState(0);

	const handleGood = () => {
		const updatedGood = good + 1;
		setGood(updatedGood);
		setTotal(updatedGood + neutral + bad);
	};

	const handleNeutral = () => {
		const updatedNeutral = neutral + 1;
		setNeutral(updatedNeutral);
		setTotal(updatedNeutral + good + bad);
	};

	const handleBad = () => {
		const updatedBad = bad + 1;
		setBad(updatedBad);
		setTotal(updatedBad + good + neutral);
	};

	const average = (good - bad) / total;
	const positive = (good / total) * 100;
	return (
		<>
			<div>
				<h1>give feedback</h1>
				<button onClick={() => handleGood()}>good</button>
				<button onClick={() => handleNeutral()}>neutral</button>
				<button onClick={() => handleBad()}>bad</button>
			</div>
			<div>
				<Statistics
					name="statistics"
					good={good}
					neutral={neutral}
					bad={bad}
					total={total}
					average={average}
					positive={positive}
				/>
			</div>
		</>
	);
};

export default App;
