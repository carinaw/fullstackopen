import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
app.use(express.json());
import cors from "cors";
app.use(cors());

const PORT = 3000;

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);
app.post("/api/patients/:id/entries", patientRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
