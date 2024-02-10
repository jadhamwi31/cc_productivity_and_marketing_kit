import { exec, execSync } from "child_process";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { EnLanguage, Transcriber } from "./services/Transcriber";
import {
	calculateNeededParts,
	generateStorageInstance,
	getStoragePath,
	getVideoDuration,
} from "./utils/utils";

const uploadVideoHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const name = req.user ? req.user.username : "unknown";
	try {
		await new Promise<void>((resolve, reject) => {
			generateStorageInstance(req.user ? req.user.username : "unknown").single(
				"video"
			)(req, res, function (err) {
				if (err) reject(err);
				// Convert to Audio
				try {
					execSync(
						`bash ${path.join(
							__dirname,
							"./scripts/convert_to_audio.sh"
						)} ${path.join(getStoragePath(), name, req.file?.filename!)}`
					);
					resolve();
				} catch (e) {
					reject(e);
				}
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
		const userStoragePath = path.join(getStoragePath(), req.user.username);

		const duration = await getVideoDuration(
			path.join(userStoragePath, `./${videoId}`)
		);

		const neededPartitions = calculateNeededParts(partitions, duration);
		console.log(neededPartitions);

		const partitionsAsArgs = neededPartitions
			.map((partition) => partition.start + " " + partition.end)
			.join(" ");
		const newId = uuid();
		const inputFileName = uuid();
		await new Promise((resolve, reject) => {
			try {
				exec(
					`bash ${path.join(
						__dirname,
						"./scripts/export.sh"
					)} ${userStoragePath} ${videoId} ${newId} ${inputFileName} ${partitionsAsArgs}`,
					(err, stdout, stderr) => {
						if (err || stderr) {
							reject(err || stderr);
							return;
						}

						resolve(stdout);
					}
				);
			} catch (e) {
				reject(e);
			}
		});

		const videoStream = fs.createReadStream(
			path.join(userStoragePath, `./${newId}.mp4`)
		);

		videoStream.pipe(res);
	} catch (e) {
		console.log(e);

		return next(e);
	}
};

const transcribeVideoHandler = async (
	req: Request<{ videoId: string }, {}, {}, { lang: EnLanguage }>,
	res: Response,
	next: NextFunction
) => {
	const { videoId } = req.params;
	const { lang } = req.query;
	try {
		if (lang !== EnLanguage.ENGLISH && lang !== EnLanguage.ARABIC) {
			throw new Error("unavailable language");
		}
		const userStoragePath = path.join(getStoragePath(), req.user.username);

		const videoPath = path.join(userStoragePath, `./${videoId}`);

		const transcriber = new Transcriber(videoPath, lang);
		const data = await transcriber.transcribe();
		return res.status(200).send(data);
	} catch (e) {
		return next(e);
	}
};

const cleanupVideos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userDirectory = path.join(getStoragePath(), req.user.username);
		const files = fs.readdirSync(userDirectory);

		for (const file of files) {
			const filePath = path.join(userDirectory, file);
			fs.unlinkSync(filePath);
		}
		return res.status(200).send({ message: "videos removed", status: 200 });
	} catch (e) {
		return next(e);
	}
};

export const VideosController = {
	uploadVideoHandler,
	exportVideoHandler,
	transcribeVideoHandler,
	cleanupVideos,
};
