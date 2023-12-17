import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { generateStorageInstance } from "../services/Storage.service";
import { getStoragePath } from "../utils/utils";
import { exec } from "child_process";
import path from "path";
import { calculateNeededParts } from "../utils/utils";
import { getVideoDuration } from "../utils/utils";
import fs from "fs";
import { Transcriber } from "../services/Transcribe.service";

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

export interface IVideoPartition {
	start: number;
	end: number;
}

const exportVideoHandler = async (
	req: Request<{ videoId: string }, {}, IVideoPartition[]>,
	res: Response,
	next: NextFunction
) => {
	const partitions = req.body;
	const { videoId } = req.params;
	try {
		const userStoragePath = path.join(
			getStoragePath(),
			req.user ? req.user.username : "unknown"
		);

		const duration = await getVideoDuration(
			path.join(userStoragePath, `./${videoId}`)
		);

		const neededPartitions = calculateNeededParts(partitions, duration);
		console.log(neededPartitions);

		const partitionsAsArgs = neededPartitions
			.map((partition) => partition.start + " " + partition.end)
			.join(" ");
		const newId = uuid();

		await new Promise((resolve, reject) =>
			exec(
				`sh ${path.join(
					__dirname,
					"../scripts/export.sh"
				)} ${userStoragePath} ${videoId} ${newId} ${partitionsAsArgs}`,
				(err, stdout, stderr) => {
					if (err) {
						reject(err);
						return;
					}

					resolve(stdout);
				}
			)
		);

		const videoStream = fs.createReadStream(
			path.join(userStoragePath, `./${newId}.mp4`)
		);

		videoStream.pipe(res);
	} catch (e) {
		return next(e);
	}
};

const transcribeVideoHandler = async (
	req: Request<{ videoId: string }>,
	res: Response,
	next: NextFunction
) => {
	const { videoId } = req.params;
	try {
		const userStoragePath = path.join(
			getStoragePath(),
			req.user ? req.user.username : "unknown"
		);

		const videoPath = path.join(userStoragePath, `./${videoId}`);

		const transcriber = new Transcriber(videoPath);
		const data = await transcriber.transcribe();
		return res.status(200).send(data);
	} catch (e) {
		return next(e);
	}
};

export const VideosController = {
	uploadVideoHandler,
	exportVideoHandler,
	transcribeVideoHandler,
};
