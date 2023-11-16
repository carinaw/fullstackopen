const Course = ({ course }) => {
	console.log("courses props", course.parts);
	return (
		<div>
			<Header course={course} />
			{course.parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<Total parts={course.parts} />
		</div>
	);
};

const Total = ({ parts }) => {
	console.log("total parts", parts);
	return (
		<p style={{ fontWeight: "bold" }}>
			Amount of exercises: {parts.reduce((a, c) => a + c.exercises, 0)}
		</p>
	);
};

const Part = ({ part }) => {
	console.log(part);
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Header = ({ course }) => {
	return (
		<div>
			<h2>{course.name}</h2>
		</div>
	);
};

export default Course;
