const calculateBmi = (height: number, weight: number) => {
	const bmi = (weight / (height * height)) * 703;

	if (bmi < 18.4) return console.log("Underweight");
	else if (bmi > 18.4 && bmi < 24.9) return console.log("Normal range");
	else if (bmi > 24.9 && bmi < 29.9) return console.log("Overweight");
	else if (bmi > 29.9) return console.log("Obese");
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[2]);
calculateBmi(height, weight);
