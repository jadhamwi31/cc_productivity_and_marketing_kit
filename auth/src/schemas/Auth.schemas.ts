import z from "zod";
import { User } from "../models/User.model";
import { compare } from "../utils/utils";

export const SIGNUP_SCHEMA = z.object({
	body: z.object({
		username: z
			.string({
				invalid_type_error: "Type should be string",
				required_error: "Username is required",
			})
			.min(8, "Username characters should be at least 8")
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

export const LOGIN_SCHEMA = z.object({
	body: z
		.object({
			username: z.string({
				invalid_type_error: "Type should be string",
				required_error: "Username is required",
			}),
			password: z.string({
				invalid_type_error: "Type should be string",
				required_error: "Password is required",
			}),
		})
		.superRefine(async ({ username, password }, ctx) => {
			const user = await User.findOne({ where: { username } });
			if (user === null) {
				ctx.addIssue({
					code: "custom",
					path: ["username"],
					message: "User doesn't exist",
					fatal: true,
				});
			} else {
				const passwordMatch = await compare(password, user.password);
				if (!passwordMatch) {
					ctx.addIssue({
						code: "custom",
						path: ["password"],
						fatal: true,
						message: "Incorrect password",
					});
				}
			}
		}),
});

export const CHANGEPASSWORD_SCHEMA = z.object({
	body: z.object({
		oldPassword: z.string({
			invalid_type_error: "Type should be string",
			required_error: "Old Password is required",
		}),
		newPassword: z
			.string({
				invalid_type_error: "Type should be string",
				required_error: "New Password is required",
			})
			.min(8, "Password characters should be at least 8")
			.max(20, "Password max characters is 20"),
	}),
});
