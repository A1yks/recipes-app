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

export type InstructionAttrs = InferAttributes<Instruction>;

class Instruction extends Model<InstructionAttrs, InferCreationAttributes<Instruction>> {
    declare id: CreationOptional<number>;
    declare text: string;
    declare stepNumber: number;
    declare recipeId: ForeignKey<Recipe['id']>;

    declare getRecipe: HasOneGetAssociationMixin<Recipe>;
}

Instruction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stepNumber: {
            type: DataTypes.INTEGER,
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
    {
        sequelize: db,
        tableName: 'instructions',
    }
);

export default Instruction;
