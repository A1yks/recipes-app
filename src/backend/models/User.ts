import db from 'backend/db';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export type UserAttrs = InferAttributes<User>;

class User extends Model<UserAttrs, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare login: string;
    declare password: string;
    declare name: CreationOptional<string>;
    declare surname: CreationOptional<string>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        login: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(72),
            allowNull: false,
        },
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
    },
    {
        sequelize: db,
        tableName: 'users',
        timestamps: true,
    }
);

export default User;
