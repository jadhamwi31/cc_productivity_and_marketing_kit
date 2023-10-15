import dotenv from "dotenv";
import express, { json } from "express";
import Database from "./models";
import { AuthRouter } from "./routers/Auth.router";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/Error.middleware";
import morgan from "morgan";
dotenv.config();

(async function () {
	Database.connect();
	const app = express();
	app.use(morgan("dev"));
	app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
	app.use(cookieParser());
	app.use(express.json());

	app.use("/auth", AuthRouter);

	app.use(ErrorMiddleware);

	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
})();
