import db from '@backend/db';
import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasOneGetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import User from './User';

export type UserInfoAttrs = InferAttributes<UserInfo>;

class UserInfo extends Model<UserInfoAttrs, InferCreationAttributes<UserInfo>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare surname: string;
    declare avatar: CreationOptional<string | null>;
    declare userId: ForeignKey<User['id']>;

    declare getUser: HasOneGetAssociationMixin<User>;
}

UserInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING(30),
        surname: DataTypes.STRING(30),
        avatar: DataTypes.TEXT,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    { sequelize: db, tableName: 'users_info' }
);

export default UserInfo;
