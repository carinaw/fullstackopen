import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import patientService from "../services/patients";

interface Props {
	patients: Patient[];
	patient: Patient;
}

const PatientPage = ({ patients }: Props) => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | null>(null);

	useEffect(() => {
		if (id) {
			patientService
				.getPatient(id)
				.then((response) => setPatient(response))
				.catch((error) => console.error(error));
		}
	}, [id]);

	const GenderIcon = () => {
		if (patient?.gender === "female") {
			return <FemaleIcon />;
		} else if (patient?.gender === "male") {
			return <MaleIcon />;
		} else {
			// Return null or an empty fragment if gender is "other" or undefined
			return null;
		}
	};

	return (
		<div className="App">
			<Box style={{ marginBottom: "1em", marginTop: "1em" }}>
				<Typography align="left" variant="h6">
					{patient?.name} <GenderIcon />
				</Typography>
			</Box>

			<Box style={{ marginBottom: "0.5em" }}>ssn: {patient?.ssn}</Box>

			<Box style={{ marginBottom: "0.5em" }}>
				occupation: {patient?.occupation}
			</Box>
		</div>
	);
};

export default PatientPage;
