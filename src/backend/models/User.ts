import db from 'backend/db';
import {
    CreationOptional,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasOneCreateAssociationMixin,
    HasOneGetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import Recipe from './Recipe';
import RefreshToken from './RefreshToken';
import UserInfo from './UserInfo';

export type UserAttrs = InferAttributes<User>;

class User extends Model<UserAttrs, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare login: string;
    declare password: string;

    declare getRefreshToken: HasOneGetAssociationMixin<RefreshToken>;
    declare getInfo: HasOneGetAssociationMixin<UserInfo>;
    declare createInfo: HasOneCreateAssociationMixin<UserInfo>;
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
    },
    {
        sequelize: db,
        tableName: 'users',
        timestamps: true,
    }
);

export default User;
