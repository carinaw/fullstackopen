import patientData from "../../data/patients";
import { NonSensitivePatientData } from "../types";
import { v1 as uuid } from "uuid";
import { Patient, NewPatient, Entry } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
	console.log(patients);
	return patients;
};

const findById = (id: string): Patient | undefined => {
	const patient = patients.find((p) => p.id === id);

	return patient;
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries = [] }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		})
	);
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...patient,
	};

	patients.push(newPatient);
	return newPatient;
};

const addEntryToPatient = (id: string, entry: Entry): Patient | undefined => {
	const patient = patients.find((p) => p.id === id);
	if (!patient) {
		return undefined;
	}
	const newEntry = { ...entry, id: uuid() };

	patient.entries.push(newEntry);
	return patient;
};

export default {
	getPatients,
	getNonSensitivePatients,
	addPatient,
	findById,
	addEntryToPatient,
};
