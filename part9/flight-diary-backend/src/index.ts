import express from "express";
const app = express();
import router from "./routes/diaries";
app.use(express.json());
import cors from "cors";
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
	console.log("someone pinged here");
	res.send("pong");
});

app.use("/api/diaries", router);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
