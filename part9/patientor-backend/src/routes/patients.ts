import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../../utils";

const router = express.Router();

router.get("/", (_req, res) => {
	console.log("fetching");
	const patients = patientService.getNonSensitivePatients();
	console.log(patients);

	res.json(patients);
});

router.post("/", (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = "Something didn't work";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
