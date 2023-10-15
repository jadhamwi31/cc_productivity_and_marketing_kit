import sequelize from "sequelize/types/sequelize";
import Database from ".";
import { DataTypes } from "sequelize";

export const User = Database.db.define("User", {
	// Model attributes are defined here
	username: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
