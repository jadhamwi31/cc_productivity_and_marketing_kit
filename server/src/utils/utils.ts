import bcrypt from "bcrypt";
import { SALT } from "../constants/constants";
import path from "path";

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
