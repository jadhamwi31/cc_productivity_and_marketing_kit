import { NextFunction, Request, Response } from "express";
import { Storage } from "../services/Storage.service";
import { MulterError } from "multer";

const uploadVideoHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await new Promise<void>((resolve, reject) => {
			Storage.single("video")(req, res, function (err) {
				if (err) throw reject(err);
				resolve();
			});
		});
		return res.status(200).send(req.file);
	} catch (e) {
		return next(e);
	}
};

export const VideosController = { uploadVideoHandler };
