import dotenv from "dotenv";
import express, { json } from "express";
import Database from "./models";
import { AuthRouter } from "./routers/Auth.router";
import cors from "cors";
dotenv.config();

(async function () {
	Database.connect();
	const app = express();

	app.use(express.json());
	app.use(cors({ origin: process.env.CLIENT_URL }));

	app.use("/auth", AuthRouter);

	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
})();
