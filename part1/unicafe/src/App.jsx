import { useState } from "react";

const Statistics = (props) => {
	if (props.total > 0) {
		return (
			<div>
				<h2>{props.name}</h2>
				<StatisticsLine text="good" statistic={props.good} />
				<StatisticsLine text="neutral" statistic={props.neutral} />
				<StatisticsLine text="bad" statistic={props.bad} />
				<StatisticsLine text="total" statistic={props.total} />
				<StatisticsLine text="average" statistic={props.average} />
				<StatisticsLine text="positive" statistic={props.positive} type="%" />
			</div>
		);
	}
	return (
		<div>
			<h2>{props.name}</h2>
			<p>no feedback yet – click above</p>
		</div>
	);
};

const Button = (props) => {
	return <button onClick={() => props.handleTheClick()}>{props.label}</button>;
};

const StatisticsLine = (props) => {
	return (
		<table>
			<tbody>
				<tr>
					<td style={{ width: "60px" }}>{props.text}</td>
					<td>
						{props.statistic} {props.type}
					</td>
				</tr>
			</tbody>
		</table>
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
				<Button handleTheClick={handleGood} label="good" />
				<Button handleTheClick={handleNeutral} label="neutral" />
				<Button handleTheClick={handleBad} label="bad" />
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
