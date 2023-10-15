import { NextFunction, Request, Response } from "express";

const signupHandler = (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).send("OK");
};

export const AuthController = { signupHandler };
