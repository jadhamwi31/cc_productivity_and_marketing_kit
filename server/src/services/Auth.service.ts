import jwt from "jsonwebtoken";
import _ from "lodash";
import { User } from "../models/User.model";
import fs from "fs";
import { getStoragePath } from "../utils/utils";
import path from "path";
import { generateStorageInstance } from "./Storage.service";
interface IUserFormData {
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	email: string;
}

const signup = async (form: IUserFormData) => {
	await User.create(form);
	fs.mkdir(
		path.join(getStoragePath(), form.username),
		{ recursive: true },
		(err) => console.log(err)
	);
};

const login = async (username: string) => {
	const user = (await User.findOne({ where: { username } }))!;

	const token = jwt.sign(
		{ username: user.username },
		String(process.env.SECRET_KEY)
	);

	const userPath = path.join(getStoragePath(), user.username);

	const files = fs.readdirSync(userPath, { recursive: true });
	files.forEach((file) => {
		try {
			if (typeof file === "string") fs.unlinkSync(path.join(userPath, file));
		} catch (e) {
			console.log(e);
		}
	});

	return { token, data: _.omit(user.dataValues, ["password"]) };
};

export const AuthService = { signup, login };
