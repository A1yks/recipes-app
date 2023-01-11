import db from 'backend/db';
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

const decimalType = DataTypes.DECIMAL(8, 2);

Nutrition.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        calories: {
            type: decimalType,
            allowNull: false,
        },
        totalFat: decimalType,
        saturatedFat: decimalType,
        cholesterol: decimalType,
        sodium: decimalType,
        potassium: decimalType,
        totalCarbohydrate: decimalType,
        sugars: decimalType,
        protein: decimalType,
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
        tableName: 'nutritions',
    }
);

export default Nutrition;
