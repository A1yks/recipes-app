import {
    Model,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    HasOneGetAssociationMixin,
} from 'sequelize';
import User from './User';
import db from 'backend/db';

export type RefreshTokenAttrs = InferAttributes<RefreshToken>;

class RefreshToken extends Model<RefreshTokenAttrs, InferCreationAttributes<RefreshToken>> {
    declare id: CreationOptional<number>;
    declare token: CreationOptional<string>;
    declare expirityDate: Date;
    declare userId: ForeignKey<User['id']>;

    declare getUser: HasOneGetAssociationMixin<User>;

    static expiresIn = 60 * 60 * 24 * 7; // 7 days (in seconds)

    static async issueToken(userId: User['id']) {
        const expireAt = new Date();

        expireAt.setSeconds(expireAt.getSeconds() + this.expiresIn);

        const refreshToken = this.build({
            userId,
            expirityDate: expireAt,
        });
        const oldToken = await this.findOne({ where: { userId } });

        if (oldToken === null) {
            await refreshToken.save();
        } else {
            await this.update(
                { token: refreshToken.token, expirityDate: refreshToken.expirityDate },
                { where: { userId } }
            );
        }

        return refreshToken.token;
    }

    static verifyToken(token: RefreshToken) {
        return token.expirityDate.getTime() >= Date.now();
    }
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        expirityDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    { sequelize: db, tableName: 'refresh_tokens' }
);

export default RefreshToken;
