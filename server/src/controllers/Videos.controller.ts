import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { generateStorageInstance } from "../services/Storage.service";
import { getStoragePath } from "../utils/utils";
import { execSync } from "child_process";
import path from "path";

const uploadVideoHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await new Promise<void>((resolve, reject) => {
			generateStorageInstance(req.user ? req.user.username : "unknown").single(
				"video"
			)(req, res, function (err) {
				if (err) throw reject(err);
				resolve();
			});
		});

		return res.status(200).send(req.file?.filename);
	} catch (e) {
		return next(e);
	}
};
const cutVideoHandler = async (
	req: Request<{ videoId: string }, {}, { start: number; end: number }>,
	res: Response,
	next: NextFunction
) => {
	const { start, end } = req.body;
	const { videoId } = req.params;
	try {
		const userStoragePath = path.join(
			getStoragePath(),
			req.user ? req.user.username : "unknown"
		);
		const newId = uuid();

		execSync(
			`sh ${path.join(
				__dirname,
				"../scripts/cut.sh"
			)} ${userStoragePath} ${videoId} ${start} ${end} ${newId}`
		);

		return res.status(200).send(`${newId}.mp4`);
	} catch (e) {
		return next(e);
	}
};

export const VideosController = { uploadVideoHandler, cutVideoHandler };
