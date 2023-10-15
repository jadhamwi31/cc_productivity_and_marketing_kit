import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";

export const AuthMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { jwt: jwtCookie } = req.cookies;

	try {
		const payload = jwt.verify(jwtCookie, String(process.env.SECRET_KEY));

		req.user = _.pick(payload, ["username"]) as {
			username: string;
		};

		return next();
	} catch (e) {
		return res.status(403).send("unauthorized");
	}
};
