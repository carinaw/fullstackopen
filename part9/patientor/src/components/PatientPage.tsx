import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
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
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (id) {
			setLoading(true);
			patientService
				.getPatient(id)
				.then((response) => {
					setPatient(response);
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setLoading(false);
				});
		}
	}, [id]);

	const GenderIcon = () => {
		if (patient?.gender === "female") {
			return <FemaleIcon />;
		} else if (patient?.gender === "male") {
			return <MaleIcon />;
		} else {
			return null;
		}
	};

	if (loading)
		return (
			<div style={{ marginBottom: "1em", marginTop: "1em" }} className="App">
				Loading...
			</div>
		);

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
			<Box style={{ marginBottom: "0.5em" }}>
				<Typography variant="h6">entries</Typography>

				{patient?.entries?.map((entry, id) => (
					<Box style={{ marginBottom: "1em", marginTop: "1em" }} key={id}>
						{entry.date} {entry.description}
						<Box style={{ marginBottom: "1em", marginTop: "1em" }}>
							{entry.diagnosisCodes?.map((code) => (
								<li>{code}</li>
							))}
						</Box>
					</Box>
				))}
			</Box>
		</div>
	);
};

export default PatientPage;
