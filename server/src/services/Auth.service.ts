import jwt from "jsonwebtoken";
import _ from "lodash";
import { User } from "../models/User.model";

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
		String(process.env.SECRET_KEY)
	);

	return { token, data: _.omit(user.dataValues, ["password"]) };
};

export const AuthService = { signup, login };
