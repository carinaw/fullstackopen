import express from "express";
const app = express();
import calculateBmi from "./bmiCalculator";

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	console.log(typeof height);
	console.log(typeof weight);

	if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
		res.status(400).json({
			error: "invalid query strings",
		});
	}

	const bmi = calculateBmi(height, weight);
	console.log(bmi, "BMI");

	if (bmi) {
		const responseObj = {
			height: height,
			weight: weight,
			bmi: bmi,
		};

		res.json(responseObj);
	} else {
		res.status(500).json({
			error: "bmi could not be calculated",
		});
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
