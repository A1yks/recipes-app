import { decimalType } from '@backend/common/dbTypes';
import db from '@backend/db';
import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasOneGetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ModelAttributeColumnOptions,
} from 'sequelize';
import Recipe from './Recipe';

export type NutritionAttrs = InferAttributes<Nutrition>;

class Nutrition extends Model<NutritionAttrs, InferCreationAttributes<Nutrition>> {
    declare id: CreationOptional<number>;
    declare calories: number;
    declare totalFat: CreationOptional<number>;
    declare saturatedFat: CreationOptional<number>;
    declare cholesterol: CreationOptional<number>;
    declare sodium: CreationOptional<number>;
    declare potassium: CreationOptional<number>;
    declare totalCarbohydrate: CreationOptional<number>;
    declare sugars: CreationOptional<number>;
    declare protein: CreationOptional<number>;
    declare recipeId: ForeignKey<Recipe['id']>;

    declare getRecipe: HasOneGetAssociationMixin<Recipe>;
}

const nutritionDecimalType = decimalType<Nutrition>;

Nutrition.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        calories: {
            ...nutritionDecimalType('calories'),
            allowNull: false,
        },
        totalFat: nutritionDecimalType('totalFat'),
        saturatedFat: nutritionDecimalType('saturatedFat'),
        cholesterol: nutritionDecimalType('cholesterol'),
        sodium: nutritionDecimalType('sodium'),
        potassium: nutritionDecimalType('potassium'),
        totalCarbohydrate: nutritionDecimalType('totalCarbohydrate'),
        sugars: nutritionDecimalType('sugars'),
        protein: nutritionDecimalType('protein'),
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: Recipe,
                key: 'id',
            },
        },
    },
    {
        sequelize: db,
        tableName: 'nutritions',
    }
);

export default Nutrition;
