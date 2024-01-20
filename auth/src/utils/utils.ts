import bcrypt from "bcrypt";
import { SALT } from "../constants/constants";

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
