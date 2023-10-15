import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { validate } from "../middlewares/Validator.middleware";
import { LOGIN_SCHEMA, SIGNUP_SCHEMA } from "../schemas/Auth.schemas";

export const AuthRouter = Router();

AuthRouter.post(
	"/signup",
	validate(SIGNUP_SCHEMA),
	AuthController.signupHandler
);
AuthRouter.post("/login", validate(LOGIN_SCHEMA), AuthController.loginHandler);
