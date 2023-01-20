import { decimalType } from '@backend/common/dbTypes';
import db from '@backend/db';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Recipe from './Recipe';
import RecipePart from './RecipePart';

export type IngridientAttrs = InferAttributes<Ingridient>;

export enum IngridientUnits {
    MG = 'mg',
    G = 'g',
    KG = 'kg',
    ML = 'ml',
    L = 'l',
    TBSP = 'tbsp',
    TSP = 'tsp',
}

class Ingridient extends Model<IngridientAttrs, InferCreationAttributes<Ingridient>> {
    declare id: CreationOptional<number>;
    declare amount: number;
    declare unit: IngridientUnits;
    declare text: string;
    declare partId: ForeignKey<RecipePart['id']>;
    declare recipeId: ForeignKey<Recipe['id']>;
}

export const MAX_INGRIDIENT_TEXT_LENGTH = 100;

const ingridientUnitValues = Object.values(IngridientUnits);
const ingirientDecimalType = decimalType<Ingridient>;

Ingridient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            ...ingirientDecimalType('amount'),
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                checkUnits(value: IngridientUnits) {
                    if (!ingridientUnitValues.includes(value)) {
                        throw new Error('Invalid ingridient unit type');
                    }
                },
            },
        },
        text: {
            type: DataTypes.STRING(MAX_INGRIDIENT_TEXT_LENGTH),
            allowNull: false,
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: RecipePart,
                key: 'id',
            },
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
    {
        sequelize: db,
        tableName: 'ingridients',
    }
);

export default Ingridient;
