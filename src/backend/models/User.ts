import db from '@backend/db';
import {
    CreationOptional,
    DataTypes,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import Recipe from './Recipe';
import RefreshToken from './RefreshToken';

export type UserAttrs = InferAttributes<User>;

class User extends Model<UserAttrs, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare login: string;
    declare password: string;
    declare name: string;
    declare surname: string;
    declare avatar: CreationOptional<string | null>;

    declare getRefreshTokens: HasManyGetAssociationsMixin<RefreshToken>;
    declare getRecipes: HasManyGetAssociationsMixin<Recipe>;
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
        name: DataTypes.STRING(30),
        surname: DataTypes.STRING(30),
        avatar: DataTypes.TEXT,
    },
    {
        sequelize: db,
        tableName: 'users',
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        },
        scopes: {
            withPassword: {
                attributes: {
                    include: ['password'],
                },
            },
        },
    }
);

export default User;
