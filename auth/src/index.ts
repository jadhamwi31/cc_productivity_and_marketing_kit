import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { AuthController } from "./controller";
import { AuthMiddleware } from "./middlewares/Auth.middleware";
import { ErrorMiddleware } from "./middlewares/Error.middleware";
import { validate } from "./middlewares/Validator.middleware";
import Database from "./models";
import { LOGIN_SCHEMA, SIGNUP_SCHEMA } from "./schemas/Auth.schemas";

dotenv.config();

(async function () {
	Database.connect();

	const app = express();
	app.use(express.json());
	app.use(cookieParser());
	app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

	app.use(morgan("dev"));

	app.post(
		"/auth/signup",
		validate(SIGNUP_SCHEMA),
		AuthController.signupHandler
	);
	app.post("/auth/login", validate(LOGIN_SCHEMA), AuthController.loginHandler);
	app.post("/auth/logout", AuthMiddleware, AuthController.logoutHandler);
	app.post(
		"/auth/change-password",
		AuthMiddleware,
		AuthController.changePasswordHandler
	);

	app.use(ErrorMiddleware);

	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
})();
