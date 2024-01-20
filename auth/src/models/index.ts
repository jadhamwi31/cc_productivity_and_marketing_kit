import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export default class Database {
	public static db: Sequelize = new Sequelize(
		String(process.env.DATABASE_NAME),
		String(process.env.DATABASE_USERNAME),
		String(process.env.DATABASE_PASSWORD),
		{ dialect: "postgres", host: process.env.DATABASE_HOST }
	);
	public static async connect() {
		await this.db.authenticate();
		await this.db.sync();
	}
}
