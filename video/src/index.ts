import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { VideosController } from "./controller";
import { AuthMiddleware } from "./middlewares/Auth.middleware";
dotenv.config();

(async function () {
	const app = express();

	app.use(express.json());
	app.use(cookieParser());
	app.use(morgan("dev"));
	app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
	app.use(AuthMiddleware);

	app.post("/videos", VideosController.uploadVideoHandler);
	app.post("/videos/:videoId/export", VideosController.exportVideoHandler);
	app.get(
		"/videos/:videoId/transcript",
		VideosController.transcribeVideoHandler
	);
	app.delete("/videos", VideosController.cleanupVideos);

	const PORT = process.env.PORT || 8081;
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
})();
