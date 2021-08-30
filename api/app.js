import express, { json } from "express";
import cors from "cors";
import mainRoute from "./routes/index.js";
import authRoute from "./routes/auth/auth.js";

const app = express();

app.use(
	cors({
		origin: "*",
	})
);
app.use(json());

app.use("/auth", authRoute);
app.use("/api", mainRoute);

export default app;
