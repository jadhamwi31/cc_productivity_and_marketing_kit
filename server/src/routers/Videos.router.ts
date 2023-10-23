import { Router } from "express";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import multer from "multer";
import { Storage } from "../services/Storage.service";
import { VideosController } from "../controllers/Videos.controller";

export const VideosRouter = Router();

VideosRouter.post("/", VideosController.uploadVideoHandler);
VideosRouter.post("/:videoId/cut", VideosController.cutVideoHandler);
