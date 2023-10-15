import z from "zod";
import { User } from "../models/User.model";

export const SIGNUP_SCHEMA = z.object({
	body: z.object({
		username: z
			.string({
				invalid_type_error: "Type should be string",
				required_error: "Username is required",
			})
			.min(8, "Usernamme characters should be at least 8")
			.refine(async (username) => {
				const user = await User.findOne({ where: { username } });

				return user === null;
			}, "Username already exists"),
		password: z
			.string({
				invalid_type_error: "Type should be string",
				required_error: "Password is required",
			})
			.min(8, "Password characters should be at least 8")
			.max(20, "Password max characters is 20"),
		firstname: z.string({
			invalid_type_error: "Type should be string",
			required_error: "Firstname is required",
		}),
		lastname: z.string({
			invalid_type_error: "Type should be string",
			required_error: "Lastname is required",
		}),
		email: z
			.string({
				invalid_type_error: "Type should be string",
				required_error: "Email is required",
			})
			.email("Invalid Email"),
	}),
});
