import { Router } from "express";
import { VideosController } from "../controllers/Videos.controller";

export const VideosRouter = Router();

VideosRouter.post("/", VideosController.uploadVideoHandler);
VideosRouter.post("/:videoId/export", VideosController.exportVideoHandler);
VideosRouter.get(
	"/:videoId/transcript",
	VideosController.transcribeVideoHandler
);
