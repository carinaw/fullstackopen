const calculateBmi = (height: number, weight: number) => {
	const bmi = (weight / (height * height)) * 703;

	if (bmi < 18.4) return "Underweight";
	else if (bmi > 18.4 && bmi < 24.9) return "Normal range";
	else if (bmi > 24.9 && bmi < 29.9) return "Overweight";
	else if (bmi > 29.9) return "Obese";
	else return "Not in range";
};

export default calculateBmi;
