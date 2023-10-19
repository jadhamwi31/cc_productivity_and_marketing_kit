import multer from "multer";
import path from "path";

export const Storage = multer({ dest: path.join(__dirname, "../../storage/") });
