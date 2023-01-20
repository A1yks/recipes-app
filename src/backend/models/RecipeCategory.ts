import db from '@backend/db';
import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Category from './Category';
import Recipe from './Recipe';

class RecipeCategory extends Model<InferAttributes<RecipeCategory>, InferCreationAttributes<RecipeCategory>> {
    declare recipeId: ForeignKey<Recipe['id']>;
    declare categoryId: ForeignKey<Category['id']>;
}

RecipeCategory.init(
    {
        recipeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Recipe,
                key: 'id',
            },
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Category,
                key: 'id',
            },
        },
    },
    {
        sequelize: db,
        tableName: 'm2m_recipes_categories',
    }
);

export default RecipeCategory;
