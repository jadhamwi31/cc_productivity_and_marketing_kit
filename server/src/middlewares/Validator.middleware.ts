import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validate =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		console.log(req.body);

		try {
			await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (e) {
			return res.status(400).send(e);
		}
	};
