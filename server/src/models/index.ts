import { Sequelize } from "sequelize";

export default class Database {
	public static db: Sequelize;
	public static async connect() {
		this.db = new Sequelize(
			String(process.env.DATABASE_NAME),
			String(process.env.DATABASE_USERNAME),
			String(process.env.DATABASE_PASSWORD),
			{ dialect: "postgres" }
		);
		await this.db.authenticate();
	}
}
