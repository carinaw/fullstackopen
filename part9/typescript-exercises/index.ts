import express from "express";
const app = express();
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
app.use(express.json());

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	console.log(typeof height);
	console.log(typeof weight);

	if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
		res.status(400).send({
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

app.post("/exercises", (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const target = Number(req.body.target);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const dailyHours = Array.isArray(req.body.dailyHours)
			? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			  (req.body.dailyHours as [])
			: [];
		const numericDailyHours = dailyHours.map(Number);

		if (
			numericDailyHours.some(isNaN) || // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			!Array.isArray(req.body.dailyHours) ||
			isNaN(target)
		) {
			res.status(400).send({ error: "malformatted arguments" });
			return;
		}

		if (!target || !dailyHours) {
			res.status(400).send({
				error: "parameters missing",
			});
		}

		const result = calculateExercises(Number(target), dailyHours);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: "nope" });
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
