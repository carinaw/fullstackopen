const App = () => {
	const course = "Half Stack application development";
	const parts = [
		{
			name: "Fundamentals of React",
			exercises: 10,
			id: 1,
		},
		{
			name: "Using props to pass data",
			exercises: 7,
			id: 2,
		},
		{
			name: "State of a component",
			exercises: 14,
			id: 3,
		},
	];

	return (
		<div>
			<Course course={course} />
			<Content parts={parts} />
			<Sum parts={parts} />
		</div>
	);
};

const Sum = ({ parts }) => {
	const total = parts.reduce((p, n) => p + n.exercises, 0);
	console.log(total);
	return (
		<div>
			<p>Total exercises: {total}</p>
		</div>
	);
};

const Course = (props) => {
	return <Header course={props.course} />;
};

const Header = ({ course }) => {
	return (
		<div>
			<h1>{course}</h1>
		</div>
	);
};

const Content = ({ parts }) => {
	console.log(parts);
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</div>
	);
};

const Part = ({ part }) => {
	console.log("part props", part);
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

export default App;
