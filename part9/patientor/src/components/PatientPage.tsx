import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, EntryForm } from "../types";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnoses";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

interface Props {
	patients: Patient[];
	patient: Patient;
	diagnosis: Diagnosis;
}

const PatientPage = (): Props => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [showAddEntryForm, setShowAddEntryForm] = useState(false);
	const [entryError, setEntryError] = useState("");

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

	useEffect(() => {
		diagnoseService
			.getAll()
			.then((response) => {
				console.log(response);
				setDiagnoses(response);
			})
			.catch((error) => {
				console.error(error);
				console.log("ERROR", error);
			});
	}, []);

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

	const handleAddEntrySubmit = async (entryData: EntryForm) => {
		if (patient && patient.id) {
			// because I need it to add the entry to
			try {
				const updatedPatient = await patientService.addEntryToPatient(
					patient.id,
					entryData
				);
				setPatient(updatedPatient);
				setShowAddEntryForm(false);
				setEntryError("");
			} catch (error) {
				const receivedErrors = error.response?.data?.errors || [
					"An unexpected error occurred",
				];
				setEntryError(receivedErrors);
			}
		}
	};

	const handleAddEntryCancel = () => {
		setShowAddEntryForm(false);
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
			<Box sx={{ my: 2 }}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					entries
				</Typography>

				{patient?.entries?.map((entry) => (
					<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
				))}
			</Box>
			<Button
				variant="outlined"
				color="primary"
				onClick={() => setShowAddEntryForm(!showAddEntryForm)}
			>
				Add Entry
			</Button>
			{showAddEntryForm && (
				<AddEntryForm
					onCancel={handleAddEntryCancel}
					patient={patient}
					entryError={entryError}
					onSubmit={handleAddEntrySubmit}
					diagnoses={diagnoses}
				/>
			)}
		</div>
	);
};

export default PatientPage;
