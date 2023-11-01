import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import { getStoragePath } from "../utils/utils";

export const generateStorageInstance = (username: string) => {
	const diskStorage = multer.diskStorage({
		destination: path.join(getStoragePath(), username),
		filename: function (req, file, cb) {
			cb(null, uuid() + ".mp4");
		},
	});
	const storage = multer({ storage: diskStorage });
	return storage;
};
