import db from 'backend/db';
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

// Decimal values are returned as strings. Here strings are converted to numbers.
const decimalType = (key: keyof NutritionAttrs): ModelAttributeColumnOptions<Nutrition> => ({
    type: DataTypes.DECIMAL(8, 2),
    get() {
        const value = this.getDataValue(key);

        if (typeof value === 'string') {
            return parseFloat(value);
        }

        return value;
    },
});

Nutrition.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        calories: {
            ...decimalType('calories'),
            allowNull: false,
        },
        totalFat: decimalType('totalFat'),
        saturatedFat: decimalType('saturatedFat'),
        cholesterol: decimalType('cholesterol'),
        sodium: decimalType('sodium'),
        potassium: decimalType('potassium'),
        totalCarbohydrate: decimalType('totalCarbohydrate'),
        sugars: decimalType('sugars'),
        protein: decimalType('protein'),
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
