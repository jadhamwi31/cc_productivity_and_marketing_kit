import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from "sequelize";
import Database from ".";
import { hashPassword } from "../utils/utils";

export class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User>
> {
	declare username: string;
	declare password: string;
	declare firstname: string;
	declare lastname: string;
	declare email: string;
}

User.init(
	{
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
	},
	{
		sequelize: Database.db,
		tableName: "user",
		timestamps: false,
	}
);

User.beforeCreate(async (user) => {
	user.password = await hashPassword(user.password);
});
