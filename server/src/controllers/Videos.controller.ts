import { NextFunction, Request, Response } from "express";
import { Storage } from "../services/Storage.service";
import { MulterError } from "multer";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";

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
		const file = fs.createReadStream(
			path.join(__dirname, "../../storage/videos", videoId)
		);
		console.log(start, end);

		ffmpeg(file)
			.videoFilters(
				`select='not(between(t,${start},${end}))',setpts=N/FRAME_RATE/TB`
			)
			.audioFilters(`aselect='not(between(t,${start},${end}))',asetpts=N/SR/TB`)
			.addOutput(
				path.join(__dirname, "../../storage/videos", `${videoId}jad.mp4`)
			)
			.run();
		return res.status(200).send("OK");
	} catch (e) {
		return next(e);
	}
};

export const VideosController = { uploadVideoHandler, cutVideoHandler };
