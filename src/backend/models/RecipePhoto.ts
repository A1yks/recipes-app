import db from 'backend/db';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Recipe from './Recipe';

export type PhotoAttrs = InferAttributes<RecipePhoto>;

class RecipePhoto extends Model<PhotoAttrs, InferCreationAttributes<RecipePhoto>> {
    declare id: CreationOptional<number>;
    declare url: string;
    declare recipeId: ForeignKey<Recipe['id']>;
}

RecipePhoto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Recipe,
                key: 'id',
            },
        },
    },
    { sequelize: db, tableName: 'recipe_photos' }
);

export default RecipePhoto;
