import { NewPatient } from "./src/types";
import { Gender } from "./src/types";
import { Entry } from "./src/types";
// Import the specific Entry types

const isValidEntryType = (entry: unknown): entry is Entry => {
	if (typeof entry === "object" && entry !== null) {
		const type = (entry as { type?: unknown }).type;
		const validTypes = ["Hospital", "OccupationalHealthcare", "HealthCheck"];
		return typeof type === "string" && validTypes.includes(type);
	}
	return false;
};

const parseEntries = (entries: unknown): Entry[] => {
	if (!Array.isArray(entries)) {
		throw new Error("Incorrect or missing entries array");
	}

	return entries.map((entry: unknown) => {
		if (!isValidEntryType(entry)) {
			throw new Error("Entry is not valid");
		}
		// At this point, TypeScript knows entry is one of the specific Entry types
		return entry;
	});
};

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}
	if (
		"name" in object &&
		"dateOfBirth" in object &&
		"gender" in object &&
		"occupation" in object &&
		"ssn" in object &&
		"entries" in object
	) {
		const newPatient: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseBirthDate(object.dateOfBirth),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			ssn: parseSsn(object.ssn),
			entries: parseEntries(object.entries),
		};
		return newPatient;
	}
	throw new Error("missing data");
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("incorrect or missing name");
	}
	return name;
};

const isCorrectFormat = (dateOfBirth: string) => {
	const regex = /^\d{4}-\d{2}-\d{2}$/;

	return regex.test(dateOfBirth);
};

const parseBirthDate = (dateOfBirth: unknown): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isCorrectFormat(dateOfBirth)) {
		throw new Error("birth date not correct");
	}
	return dateOfBirth;
};

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error("incorrect or missing occupation");
	}
	return occupation;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error("incorrect or missing ssn");
	}
	return ssn;
};

const isGender = (param: unknown): param is Gender => {
	return (
		typeof param === "string" && Object.values(Gender).includes(param as Gender)
	);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error("Incorrect or missing gender: " + gender);
	}
	return gender;
};

export default toNewPatient;
