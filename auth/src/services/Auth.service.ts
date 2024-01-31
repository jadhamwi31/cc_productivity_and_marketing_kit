import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { CustomError } from "../models/Error.model";
import { User } from "../models/User.model";
import { compare, hashPassword } from "../utils/utils";
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

const changePassword = async (
	username: string,
	oldPassword: string,
	newPassword: string
) => {
	const user = await User.findOne({ where: { username } });
	if (!user) {
		throw new CustomError(StatusCodes.NOT_FOUND, "user not found");
	}

	const matchedPassword = await compare(oldPassword, user.password);
	if (!matchedPassword) {
		throw new CustomError(StatusCodes.BAD_REQUEST, "incorrect password");
	}
	user.password = await hashPassword(newPassword);
	await user.save();
};

export const AuthService = { signup, login, changePassword };
