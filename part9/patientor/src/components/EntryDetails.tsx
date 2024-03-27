import { Box, Card, CardContent, Typography } from "@mui/material";
import {
	Entry,
	HealthCheckEntry,
	OccupationalHealthcareEntry,
	HospitalEntry,
	Diagnosis,
	HealthCheckRating,
} from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface EntryDetailsProps {
	entry: Entry;
	diagnoses: Diagnosis[] | null;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
		case "OccupationalHealthcare":
			return (
				<OccupationalHealthCareEntryDetails
					entry={entry}
					diagnoses={diagnoses}
				/>
			);
		case "HealthCheck":
			return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
		default:
			return assertNever(entry);
	}
};

const HospitalEntryDetails: React.FC<{
	entry: HospitalEntry;
	diagnoses: Diagnosis[] | null;
}> = ({ entry, diagnoses }) => {
	return (
		<Card variant="outlined" sx={{ mb: 2 }}>
			<CardContent>
				<Typography variant="h6">
					{entry.date} <LocalHospitalIcon />
				</Typography>
				<Box>{entry.description}</Box>
				<Box sx={{ m: 2 }}>
					{entry.diagnosisCodes?.map((code) => (
						<li key={code}>
							{code} –{" "}
							{diagnoses?.find((d) => d.code === code)?.name}
						</li>
					))}
				</Box>
				<Box>diagnose by: {entry.specialist}</Box>
				<Box sx={{ mt: 2 }}>discharge date: {entry.discharge.date}</Box>
				<Box>discharge criteria: {entry.discharge.criteria}</Box>
			</CardContent>
		</Card>
	);
};

const OccupationalHealthCareEntryDetails: React.FC<{
	entry: OccupationalHealthcareEntry;
	diagnoses: Diagnosis[] | null;
}> = ({ entry, diagnoses }) => {
	return (
		<Card variant="outlined" sx={{ mb: 2 }}>
			<CardContent>
				<Typography variant="h6">
					{entry.date} <WorkIcon />
				</Typography>
				<Box>{entry.description}</Box>
				<Box sx={{ m: 2 }}>
					{entry.diagnosisCodes?.map((code) => (
						<li key={code}>
							{code} –{" "}
							{diagnoses?.find((d) => d.code === code)?.name}
						</li>
					))}
				</Box>
				<Box>diagnose by: {entry.specialist}</Box>
				{entry.sickLeave && (
					<Box sx={{ m: 2 }}>
						<Box>sick leave start date: {entry.sickLeave?.startDate}</Box>
						<Box>sick leave end date: {entry.sickLeave?.endDate}</Box>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

const HealthCheckEntryDetails: React.FC<{
	entry: HealthCheckEntry;
	diagnoses: Diagnosis[] | null;
}> = ({ entry, diagnoses }) => {
	return (
		<Card variant="outlined" sx={{ mb: 2 }}>
			<CardContent>
				<Typography variant="h6">
					{entry.date} <MonitorHeartIcon />
				</Typography>
				<Box>{entry.description}</Box>
				<Box sx={{ m: 2 }}>
					{entry.diagnosisCodes?.map((code) => (
						<li key={code}>
							{code} –{" "}
							{diagnoses?.find((d) => d.code === code)?.name}
						</li>
					))}
				</Box>
				<Box>diagnose by: {entry.specialist}</Box>
				<Box sx={{ mt: 2 }}>
					health rating: <HealthCheckIcon rating={entry.healthCheckRating} />
				</Box>
			</CardContent>
		</Card>
	);
};

const assertNever = (value: never): never => {
	throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

interface HealthCheckRatingProps {
	rating: HealthCheckRating;
}

const HealthCheckIcon: React.FC<HealthCheckRatingProps> = ({ rating }) => {
	switch (rating) {
		case HealthCheckRating.Healthy:
			return <FavoriteIcon style={{ color: "green" }} />;
		case HealthCheckRating.LowRisk:
			return <FavoriteIcon style={{ color: "yellow" }} />;
		case HealthCheckRating.HighRisk:
			return <FavoriteIcon style={{ color: "orange" }} />;
		case HealthCheckRating.CriticalRisk:
			return <FavoriteIcon style={{ color: "red" }} />;
		default:
			return <FavoriteIcon />;
	}
};

export default EntryDetails;
