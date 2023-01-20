import db from '@backend/db';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Recipe from './Recipe';

export type RecipePhotoAttrs = InferAttributes<RecipePhoto>;

class RecipePhoto extends Model<RecipePhotoAttrs, InferCreationAttributes<RecipePhoto>> {
    declare id: CreationOptional<number>;
    declare fileName: string;
    declare recipeId: ForeignKey<Recipe['id']>;
}

RecipePhoto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fileName: {
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
    { sequelize: db, tableName: 'recipe_photos', timestamps: true }
);

export default RecipePhoto;
