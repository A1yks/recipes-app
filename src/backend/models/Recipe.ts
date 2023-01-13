import db from 'backend/db';
import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasManyAddAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasOneCreateAssociationMixin,
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
export type RecipeCreationAttrs = InferCreationAttributes<Recipe>;

class Recipe extends Model<RecipeAttrs, RecipeCreationAttrs> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare pictureUrl: CreationOptional<string>;
    declare description: CreationOptional<string>;
    declare prepTime: CreationOptional<number>;
    declare servings: CreationOptional<number>;
    declare authorId: ForeignKey<User['id']>;
    declare categories?: NonAttribute<Category[]>;
    declare instructions?: NonAttribute<Instruction[]>;
    declare nutrition?: NonAttribute<Nutrition | null>;

    declare getCategories: BelongsToManyGetAssociationsMixin<Category>;
    declare getInstructions: HasManyGetAssociationsMixin<Instruction>;
    declare getNutrition: HasOneGetAssociationMixin<Nutrition>;
    declare getAuthor: HasOneGetAssociationMixin<User>;
    declare createNutrition: HasOneCreateAssociationMixin<Nutrition>;
    declare addInstructions: HasManyAddAssociationsMixin<Instruction, Instruction['id']>;
    declare addCategory: BelongsToManyAddAssociationMixin<Category, Category['id']>;
    declare setCategories: BelongsToManySetAssociationsMixin<Category, Category['id']>;
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
        description: DataTypes.TEXT,
        prepTime: {
            type: DataTypes.INTEGER,
            validate: {
                min: MIN_PREP_TIME,
            },
        },
        servings: {
            type: DataTypes.INTEGER,
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
