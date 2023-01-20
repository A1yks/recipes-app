import db from '@backend/db';
import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import { IngridientAttrs } from './Ingridient';
import Recipe from './Recipe';

export type RecipePartAttrs = InferAttributes<RecipePart>;

class RecipePart extends Model<RecipePartAttrs, InferCreationAttributes<RecipePart>> {
    declare id: CreationOptional<number>;
    declare partName: CreationOptional<string | null>;
    declare recipeId: ForeignKey<Recipe['id']>;
    declare ingridients?: NonAttribute<IngridientAttrs[]>;
}

export const MAX_PART_NAME_LENGTH = 30;

RecipePart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partName: DataTypes.STRING(MAX_PART_NAME_LENGTH),
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Recipe,
                key: 'id',
            },
        },
    },
    {
        sequelize: db,
        tableName: 'recipe_parts',
    }
);

export default RecipePart;
