import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MulterError } from "multer";
import { ZodError } from "zod";
import { CustomError } from "../models/Error.model";

export const ErrorMiddleware = async (
	e: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(e);

	if (e instanceof ZodError) {
		return res.status(StatusCodes.BAD_REQUEST).send({ errors: e.issues });
	} else if (e instanceof MulterError) {
		return res.status(StatusCodes.BAD_REQUEST).send(e.message);
	} else if (e instanceof CustomError) {
		return res.status(e.code).send(e.Format());
	} else {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send("Internal Server Error");
	}
};
