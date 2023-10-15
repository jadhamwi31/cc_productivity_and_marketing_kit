import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/Auth.service";
import STATUS_CODES from "http-status-codes";

const signupHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const form = req.body;
	try {
		await AuthService.signup(form);
		return res
			.status(STATUS_CODES.OK)
			.send({ status: STATUS_CODES.OK, message: "User created" });
	} catch (e) {
		return next(e);
	}
};

export const AuthController = { signupHandler };
