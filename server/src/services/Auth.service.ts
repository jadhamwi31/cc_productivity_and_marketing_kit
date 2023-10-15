import Zod from "zod";
import { User } from "../models/User.model";
import jwt from "jsonwebtoken";
import _ from "lodash";

interface IUserFormData {
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	email: string;
}

const signup = async (form: IUserFormData) => {
	await User.create(form);
};

const login = async (username: string) => {
	const user = (await User.findOne({ where: { username } }))!;

	const token = jwt.sign(
		{ username: user.username },
		String(process.env.SECREY_KEY)
	);

	return { token, data: _.omit(user.dataValues, ["password"]) };
};

export const AuthService = { signup, login };
