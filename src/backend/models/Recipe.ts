import { MAX_TITLE_LENGTH, MIN_PREP_TIME, MIN_SERVINGS } from '@backend/controllers/recipes/validation';
import db from '@backend/db';
import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
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
import Category, { CategoryAttrs } from './Category';
import Instruction, { InstructionAttrs } from './Instruction';
import Nutrition, { NutritionAttrs } from './Nutrition';
import { RecipePartAttrs } from './RecipePart';
import { RecipePhotoAttrs } from './RecipePhoto';
import User, { UserAttrs } from './User';

export type RecipeAttrs = InferAttributes<Recipe>;
export type RecipeCreationAttrs = InferCreationAttributes<Recipe>;
export type RecipeAuthor = Pick<UserAttrs, 'id' | 'login' | 'name' | 'surname' | 'avatar'>;

class Recipe extends Model<RecipeAttrs, RecipeCreationAttrs> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare pictureUrl: CreationOptional<string | null>;
    declare description: CreationOptional<string | null>;
    declare prepTime: CreationOptional<number | null>;
    declare servings: CreationOptional<number | null>;
    declare authorId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare author?: NonAttribute<RecipeAuthor>;
    declare categories?: NonAttribute<CategoryAttrs[]>;
    declare instructions?: NonAttribute<InstructionAttrs[]>;
    declare nutrition?: NonAttribute<NutritionAttrs | null>;
    declare parts?: NonAttribute<RecipePartAttrs[]>;
    declare photos?: NonAttribute<RecipePhotoAttrs[]>;
    declare rating?: NonAttribute<number | string>;

    declare getCategories: BelongsToManyGetAssociationsMixin<Category>;
    declare getInstructions: HasManyGetAssociationsMixin<Instruction>;
    declare getNutrition: HasOneGetAssociationMixin<Nutrition>;
    declare getAuthor: HasOneGetAssociationMixin<User>;
    declare createNutrition: HasOneCreateAssociationMixin<Nutrition>;
    declare addInstructions: HasManyAddAssociationsMixin<Instruction, Instruction['id']>;
    declare addCategory: BelongsToManyAddAssociationMixin<Category, Category['id']>;
    declare removeCategory: BelongsToManyRemoveAssociationMixin<Category, Category['id']>;
    declare setCategories: BelongsToManySetAssociationsMixin<Category, Category['id']>;
}

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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize: db,
        tableName: 'recipes',
        timestamps: true,
    }
);

export default Recipe;
