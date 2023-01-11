import db from 'backend/db';
import {
    BelongsToManyGetAssociationsMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasManyGetAssociationsMixin,
    HasOneGetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import Category from './Category';
import Instruction from './Instruction';
import Nutrition from './Nutrition';
import User from './User';

export type RecipeAttrs = InferAttributes<Recipe>;

class Recipe extends Model<RecipeAttrs, InferCreationAttributes<Recipe>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare pictureUrl: string;
    declare description: string;
    declare prepTime: number;
    declare servings: number;
    declare authorId: ForeignKey<User['id']>;
    declare categories?: NonAttribute<Category[]>;
    declare instructions?: NonAttribute<Instruction[]>;
    declare nutrition?: NonAttribute<Nutrition>;

    declare getCategories: BelongsToManyGetAssociationsMixin<Category>;
    declare getInstructions: HasManyGetAssociationsMixin<Instruction>;
    declare getNutrition: HasOneGetAssociationMixin<Nutrition>;
    declare getAuthor: HasOneGetAssociationMixin<User>;
}

export const MAX_TITLE_LENGTH = 72;
export const MIN_PREP_TIME = 1;
export const MIN_SERVINGS = 1;

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(MAX_TITLE_LENGTH),
            allowNull: false,
        },
        pictureUrl: DataTypes.TEXT,
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        prepTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: MIN_PREP_TIME,
            },
        },
        servings: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: MIN_SERVINGS,
            },
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize: db,
        tableName: 'recipes',
    }
);

export default Recipe;
