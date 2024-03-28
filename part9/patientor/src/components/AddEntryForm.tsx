import React, { useState, SyntheticEvent } from "react";

import {
	TextField,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	Box,
	Typography,
	Radio,
	FormControl,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Alert,
} from "@mui/material";

import { Diagnosis, HealthCheckRating } from "../types";

interface AddEntryFormProps {
	onCancel: () => void;
	onSubmit: (entryData: EntryForm) => void;
	entryError: string;
	diagnoses: Diagnosis[];
}

interface BaseEntryForm {
	description: string;
	date: string;
	specialist: string;
	type: "HealthCheck" | "Hospital" | "OccupationalHealthcare";
	diagnosisCodes: string[];
}

interface HealthCheckForm extends BaseEntryForm {
	healthCheckRating: HealthCheckRating;
}

interface HospitalForm extends BaseEntryForm {
	discharge: {
		date: string;
		criteria: string;
	};
}

interface OccupationalHealthcareForm extends BaseEntryForm {
	employerName: string;
	sickLeave: {
		startDate?: string;
		endDate?: string;
	};
}

export type EntryForm =
	| HealthCheckForm
	| HospitalForm
	| OccupationalHealthcareForm;

const AddEntryForm: React.FC<AddEntryFormProps> = ({
	onCancel,
	onSubmit,
	entryError,
	diagnoses,
}) => {
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [entryType, setEntryType] = useState<
		"HealthCheck" | "Hospital" | "OccupationalHealthcare"
	>("HealthCheck");
	const [healthCheckRating, setHealthCheckRating] =
		useState<HealthCheckRating>(0);
	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");
	const [sickLeaveEndDate, setsickLeaveEndDate] = useState("");
	const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
	const [employerName, setEmployerName] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState([]);

	const codes = diagnoses.map((diagnosis) => diagnosis.code);

	const entryTypeRadios = () => (
		<FormControl>
			<FormLabel component="header">Entry Type</FormLabel>
			<RadioGroup
				row
				aria-label="entryType"
				name="entryType"
				value={entryType}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setEntryType(
						event.target.value as
							| "HealthCheck"
							| "Hospital"
							| "OccupationalHealthcare"
					)
				}
			>
				<FormControlLabel
					value="HealthCheck"
					control={<Radio />}
					label="Health Check"
				/>
				<FormControlLabel
					value="Hospital"
					control={<Radio />}
					label="Hospital"
				/>
				<FormControlLabel
					value="OccupationalHealthcare"
					control={<Radio />}
					label="Occupational Healthcare"
				/>
			</RadioGroup>
		</FormControl>
	);

	const renderHealthCheckFields = () => (
		<Box>
			<FormControl sx={{ m: 1, minWidth: 200 }}>
				<InputLabel id="health-check">Health Check Rating</InputLabel>
				<Select
					labelId="health-check-rating-label"
					id="health-check-rating"
					value={healthCheckRating}
					label="Health Check Rating"
					autoWidth
					onChange={(event) =>
						setHealthCheckRating(event.target.value as HealthCheckRating)
					}
				>
					<MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
					<MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
					<MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
					<MenuItem value={HealthCheckRating.CriticalRisk}>
						Critical Risk
					</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);

	const renderHospitalFields = () => (
		<Box>
			<TextField
				type="date"
				value={dischargeDate}
				onChange={({ target }) => setDischargeDate(target.value)}
			/>

			<TextField
				label="dischargeCriteria"
				fullWidth
				value={dischargeCriteria}
				onChange={({ target }) => setDischargeCriteria(target.value)}
			/>
		</Box>
	);

	const renderOccupationalHealthcareFields = () => (
		<Box>
			{" "}
			<TextField
				label="employerName"
				fullWidth
				value={employerName}
				onChange={({ target }) => setEmployerName(target.value)}
			/>
			<TextField
				type="date"
				fullWidth
				value={sickLeaveStartDate}
				onChange={({ target }) => setSickLeaveStartDate(target.value)}
			/>
			<TextField
				type="date"
				fullWidth
				value={sickLeaveEndDate}
				onChange={({ target }) => setsickLeaveEndDate(target.value)}
			/>
		</Box>
	);

	const renderFormFields = () => {
		switch (entryType) {
			case "HealthCheck":
				return renderHealthCheckFields();
			case "Hospital":
				return renderHospitalFields();
			case "OccupationalHealthcare":
				return renderOccupationalHealthcareFields();
			default:
				return null;
		}
	};

	const addEntry = async (event: SyntheticEvent) => {
		event.preventDefault();

		let formData: EntryForm;
		switch (entryType) {
			case "HealthCheck":
				formData = {
					type: entryType,
					description,
					specialist,
					date,
					diagnosisCodes,
					healthCheckRating,
				};
				break;
			case "Hospital":
				formData = {
					type: entryType,
					description,
					specialist,
					date,
					diagnosisCodes,
					discharge: { criteria: dischargeCriteria, date: dischargeDate },
				};
				break;
			case "OccupationalHealthcare":
				formData = {
					type: entryType,
					description,
					specialist,
					date,
					employerName,
					diagnosisCodes,
					sickLeave: {
						startDate: sickLeaveEndDate,
						endDate: sickLeaveStartDate,
					},
				};
				break;
			default:
				throw new Error("unsupported entry type");
		}

		try {
			onSubmit(formData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box sx={{ mt: 4 }}>
			{entryError && <Alert severity="error">{entryError}</Alert>}
			<form onSubmit={addEntry}>
				<Typography variant="h6">add new entry</Typography>
				{entryTypeRadios()}

				<TextField
					label="description"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<TextField
					type="date"
					placeholder="YYYY-MM-DD"
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label="specialist"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>

				<InputLabel id="diagnosisCodes">Diagnosis Codes</InputLabel>
				<Select
					labelId="diagnosis-codes"
					multiple
					value={diagnosisCodes}
					onChange={({ target }) =>
						setDiagnosisCodes(Array.isArray(target.value) ? target.value : [])
					}
					sx={{ m: 1, minWidth: 200 }}
				>
					{codes.map((code) => (
						<MenuItem key={code} value={code}>
							{code}
						</MenuItem>
					))}
				</Select>
				{renderFormFields()}

				<Grid sx={{ mt: 2 }}>
					<Grid item>
						<Button
							color="secondary"
							variant="outlined"
							style={{ float: "left" }}
							type="button"
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: "left",
							}}
							type="submit"
							variant="contained"
							sx={{ mx: 2 }}
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default AddEntryForm;
