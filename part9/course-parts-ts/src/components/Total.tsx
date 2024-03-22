type CoursePart = {
	name: string;
	exerciseCount: number;
};

type TotalProps = {
	courseParts: CoursePart[];
};

const Total = ({ courseParts }: TotalProps) => {
	const totalExercises = courseParts.reduce(
		(sum, part) => sum + part.exerciseCount,
		0
	);
	return (
		<div>
			<p>Number of exercises {totalExercises}</p>
		</div>
	);
};

export default Total;
