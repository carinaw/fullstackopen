import Part from "./Part";
import { CoursePart } from "./Part";

type CourseProps = { courseParts: CoursePart[] };

const Content = ({ courseParts }: CourseProps) => {
	return (
		<div>
			{courseParts.map((part, index) => (
				<Part key={index} coursePart={part} />
			))}
		</div>
	);
};

export default Content;
