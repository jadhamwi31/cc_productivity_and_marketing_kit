import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const ErrorMiddleware = async (
	e: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (e instanceof ZodError) {
		return res.status(StatusCodes.BAD_REQUEST).send({ errors: e.issues });
	} else {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send("Internal Server Error");
	}
};
