import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { generateStorageInstance } from "../services/Storage.service";
import { getStoragePath } from "../utils/utils";
import { execSync } from "child_process";
import path from "path";
import { calculateNeededParts } from "../utils/utils";
import { getVideoDuration } from "../utils/utils";
import fs from "fs";

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

		new Promise((resolve) =>
			resolve(
				execSync(
					`sh ${path.join(
						__dirname,
						"../scripts/export.sh"
					)} ${userStoragePath} ${videoId} ${newId} ${partitionsAsArgs}`,
					{ stdio: "inherit" }
				)
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

export const VideosController = { uploadVideoHandler, exportVideoHandler };
