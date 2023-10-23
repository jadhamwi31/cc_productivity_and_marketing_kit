import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { ErrorMiddleware } from "./middlewares/Error.middleware";
import Database from "./models";
import { AuthRouter } from "./routers/Auth.router";

dotenv.config();

(async function () {
	Database.connect();
	const app = express();
	app.use(morgan("dev"));
	app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

	app.use(express.json());
	app.use("/auth", AuthRouter);

	app.use(
		"/storage/videos",
		express.static(path.join(__dirname, "../storage/videos"))
	);

	app.use(ErrorMiddleware);

	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
})();
