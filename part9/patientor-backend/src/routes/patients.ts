import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, validateEntry } from "../../utils";
import { Entry } from "../types";
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

router.post("/:id/entries", (req, res) => {
	const errors = validateEntry(req.body);

	if (errors.length > 0) {
		res.status(400).json({ errors });
	} else
		try {
			const patient = patientService.addEntryToPatient(
				req.params.id,
				req.body as Entry
			);
			if (!patient) {
				res.status(404).send({ error: "no patient found" });
			}
			res.json(patient);
		} catch (error) {
			res.status(500).send({ error: "Internal server error" });
		}
});

router.get("/:id", (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		const basicPatient = { ...patient, entries: patient.entries || [] };
		res.send(basicPatient);
	} else {
		res.sendStatus(404);
	}
});

router.get("/:id/entries", (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		const patientEntries = { entries: patient.entries || [] };
		res.send(patientEntries);
	} else {
		res.sendStatus(404);
	}
});

export default router;
