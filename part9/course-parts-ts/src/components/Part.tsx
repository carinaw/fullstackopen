interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
	description: string;
	kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
	description: string;
	backgroundMaterial: string;
	kind: "background";
}

interface CoursePartSpecial extends CoursePartBase {
	description: string;
	requiredSkills: string[];
	kind: "special";
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;

type PartProps = {
	coursePart: CoursePart;
};

const Part = ({ coursePart }: PartProps) => {
	switch (coursePart.kind) {
		case "basic":
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>description: {coursePart.description}</p>
				</div>
			);
		case "background":
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>description: {coursePart.description}</p>
					<p>materials: {coursePart.backgroundMaterial}</p>
				</div>
			);
		case "group":
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>group projects: {coursePart.groupProjectCount}</p>
				</div>
			);
		case "special":
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>description: {coursePart.description}</p>
					<p>
						required skills:
						{coursePart.requiredSkills.map((skill, index) => (
							<li key={index}>{skill}</li>
						))}
					</p>
				</div>
			);
	}
	return <div></div>;
};

export default Part;
