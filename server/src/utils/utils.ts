import bcrypt from "bcrypt";
import { SALT } from "../constants/constants";
import path from "path";
import { IVideoPartition } from "../controllers/Videos.controller";
import fluentFfmpeg from "fluent-ffmpeg";

export const hashPassword = async (plainPassword: string) => {
	const hashedPassword = await bcrypt.hash(plainPassword, SALT);

	return hashedPassword;
};

export const compare = async (
	plainPassword: string,
	hashedPassword: string
) => {
	const match = await bcrypt.compare(plainPassword, hashedPassword);
	return match;
};

export const getStoragePath = () => path.resolve(process.env.STORAGE_PATH!);
export function calculateNeededParts(
	skippedParts: IVideoPartition[],
	duration: number
): IVideoPartition[] {
	duration = duration - 1;
	const sortedSkippedParts = skippedParts.slice().sort((a, b) => {
		if (a.start !== b.start) {
			return a.start - b.start;
		}
		return a.end - b.end;
	});

	const wantedParts: IVideoPartition[] = [];

	if (sortedSkippedParts.length === 0) {
		return [{ start: 0, end: duration }];
	}

	for (let i = 0; i < sortedSkippedParts.length; i++) {
		const currentPart = sortedSkippedParts[i];

		if (i === 0) {
			if (currentPart.start > 0) {
				wantedParts.push({ start: 0, end: currentPart.start });
			}
		}

		if (i === sortedSkippedParts.length - 1) {
			if (currentPart.end < duration) {
				wantedParts.push({ start: currentPart.end, end: duration });
			}
		} else {
			wantedParts.push({
				start: currentPart.end,
				end: sortedSkippedParts[i + 1].start,
			});
		}
	}

	return wantedParts;
}
export function getVideoDuration(videoPath: string): Promise<number> {
	return new Promise((resolve, reject) => {
		fluentFfmpeg.ffprobe(videoPath, (err, metadata) => {
			if (err) {
				reject(err);
			} else {
				const durationInSeconds = metadata.format.duration;
				resolve(durationInSeconds as number);
			}
		});
	});
}
