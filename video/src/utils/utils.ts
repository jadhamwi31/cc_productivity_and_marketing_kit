import fluentFfmpeg from "fluent-ffmpeg";
import multer from "multer";
import path from "path";

export interface IVideoPartition {
	start: number;
	end: number;
}

export const generateStorageInstance = (username: string) => {
	const diskStorage = multer.diskStorage({
		destination: path.join(getStoragePath(), username),
	});
	const storage = multer({
		storage: diskStorage,
		limits: { fileSize: 1024 * 1024 * 1024 * 2 },
	});
	return storage;
};

export const getStoragePath = () => path.resolve(process.env.STORAGE_PATH!);
export function calculateNeededParts(
	skippedParts: IVideoPartition[],
	duration: number
): IVideoPartition[] {
	duration = duration - 1;
	const sortedSkippedParts = skippedParts
		.slice()
		.sort((a, b) => (a.start !== b.start ? a.start - b.start : a.end - b.end));

	const wantedParts: IVideoPartition[] = [];

	if (sortedSkippedParts.length === 0) {
		return [{ start: 0, end: duration }];
	}

	for (let i = 0; i < sortedSkippedParts.length; i++) {
		const currentPart = sortedSkippedParts[i];

		if (i === 0 && currentPart.start > 0) {
			wantedParts.push({ start: 0, end: currentPart.start });
		}

		if (i === sortedSkippedParts.length - 1 && currentPart.end < duration) {
			wantedParts.push({ start: currentPart.end, end: duration });
		} else if (i < sortedSkippedParts.length - 1) {
			const nextPart = sortedSkippedParts[i + 1];
			if (currentPart.end < nextPart.start) {
				wantedParts.push({ start: currentPart.end, end: nextPart.start });
			} else {
				// Handle overlap: adjust the end time of the current part
				currentPart.end = Math.min(currentPart.end, nextPart.start);
			}
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
