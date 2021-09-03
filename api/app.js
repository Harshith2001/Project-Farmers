import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

import mainRoute from "./routes/index.js";
import authRoute from "./routes/auth/auth.js";

const app = express();

app.use(
	cors({
		origin: "*",
	})
);
app.use(session({
	secret: "superdupersecret",
	resave: true,
	saveUninitialized: true,
	cookie: {
		domain: "localhost",
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
}));
app.use(json());
app.use(helmet());

app.use("/auth", authRoute);
app.use("/api", mainRoute);

export default app;
