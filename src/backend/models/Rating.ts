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
import Recipe from './Recipe';
import User from './User';

export type RatingAttrs = InferAttributes<Rating>;

class Rating extends Model<RatingAttrs, InferCreationAttributes<Rating>> {
    declare id: CreationOptional<number>;
    declare value: number;
    declare userId: ForeignKey<User['id']>;
    declare recipeId: ForeignKey<Recipe['id']>;

    declare getUser: HasOneGetAssociationMixin<User>;
    declare getRecipe: HasOneGetAssociationMixin<Recipe>;
}

export const MIN_RATING_VALUE = 1;
export const MAX_RATING_VALUE = 10;

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.SMALLINT,
            defaultValue: 0,
            allowNull: false,
            validate: {
                min: MIN_RATING_VALUE,
                max: MAX_RATING_VALUE,
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'compositeIndex',
            references: {
                model: User,
                key: 'id',
            },
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'compositeIndex',
            references: {
                model: Recipe,
                key: 'id',
            },
        },
    },
    {
        sequelize: db,
        tableName: 'ratings',
    }
);

export default Rating;
