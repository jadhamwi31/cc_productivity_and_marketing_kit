import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { ErrorMiddleware } from "./middlewares/Error.middleware";
import Database from "./models";
import { AuthRouter } from "./routers/Auth.router";
import { VideosRouter } from "./routers/Videos.router";
import { getStoragePath } from "./utils/utils";

dotenv.config();

(async function () {
	Database.connect();

	const app = express();
	app.use(express.json());

	app.use(morgan("dev"));
	app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
	app.use("/auth", AuthRouter);
	app.use("/videos", VideosRouter);

	app.use("/storage", express.static(getStoragePath()));

	app.use(ErrorMiddleware);

	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
})();
