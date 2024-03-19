interface ExerciseFeedback {
	days: number;
	trainingDays: number;
	target: number;
	averageTime: number;
	targetReached: boolean;
	rating: number;
	comment: string;
}

interface ExerciseInput {
	target: number;
	dailyHours: number[];
}

const parseArguments = (input: string[]): ExerciseInput => {
	if (input.length < 4) throw new Error("not enough arguments");

	const target = Number(process.argv[2]); // "Number" because Javascript thinks their are separate strings

	if (isNaN(target)) throw new Error("has to be a number");

	const dailyHours = process.argv.slice(3).map(Number);
	if (dailyHours.length === 0 || dailyHours.some(isNaN)) {
		throw new Error("daily hours input not correct");
	}

	return { target, dailyHours };
};

const calculateExercises = (
	target: number,
	dailyHours: number[]
): ExerciseFeedback => {
	const days = dailyHours.length;

	const trainingDays = dailyHours.filter((a) => a > 0).length;

	const totalHours = dailyHours.reduce((a, b) => a + b, 0);

	const averageTime = Math.round(((totalHours / days) * 100) / 100);

	const targetReached = averageTime >= target;

	let rating: number;
	let comment: string;

	if (averageTime < target) {
		rating = 1;
		comment = "try harder";
	} else if (averageTime == target) {
		rating = 2;
		comment = "great week";
	} else if (averageTime > target) {
		rating = 3;
		comment = "awesome";
	}

	return {
		days,
		trainingDays,
		target,
		averageTime,
		targetReached,
		rating,
		comment,
	};
};

try {
	const args = parseArguments(process.argv);

	console.log(calculateExercises(args.target, args.dailyHours));
} catch (error) {
	console.error("Error:", error.message);
}
