export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: string;
	ssn?: string;
	dateOfBirth?: string;
}

export type NonSensitivePatientData = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}
