import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MulterError } from "multer";

export const ErrorMiddleware = async (
	e: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(e);

	if (e instanceof MulterError) {
		return res.status(StatusCodes.BAD_REQUEST).send(e.message);
	} else {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send("Internal Server Error");
	}
};
