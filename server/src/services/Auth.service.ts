import Zod from "zod";
import { User } from "../models/User.model";

interface ISignupForm {
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	email: string;
}

const signup = async (form: ISignupForm) => {
	await User.create(form);
};

export const AuthService = { signup };
