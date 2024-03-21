import diagnosesData from "../../data/diagnosesData";

import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
	console.log(diagnoses);
	return diagnoses;
};

export default { getDiagnoses };
