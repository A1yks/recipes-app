import Category from '@backend/models/Category';
import Comment from '@backend/models/Comment';
import Ingridient from '@backend/models/Ingridient';
import Instruction from '@backend/models/Instruction';
import Nutrition from '@backend/models/Nutrition';
import Rating from '@backend/models/Rating';
import Recipe from '@backend/models/Recipe';
import RecipeCategory from '@backend/models/RecipeCategory';
import RecipePart from '@backend/models/RecipePart';
import RecipePhoto from '@backend/models/RecipePhoto';
import RefreshToken from '@backend/models/RefreshToken';
import User from '@backend/models/User';

function buildRelations() {
    User.hasMany(RefreshToken, {
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });

    RefreshToken.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'userId',
    });

    Recipe.belongsToMany(Category, {
        through: RecipeCategory,
        foreignKey: 'recipeId',
        otherKey: 'categoryId',
        as: 'categories',
    });

    Category.belongsToMany(Recipe, {
        through: RecipeCategory,
        foreignKey: 'categoryId',
        otherKey: 'recipeId',
        as: 'recipes',
    });

    Recipe.hasMany(Instruction, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        as: 'instructions',
    });

    Instruction.belongsTo(Recipe, {
        targetKey: 'id',
        foreignKey: 'recipeId',
    });

    User.hasMany(Rating, {
        foreignKey: 'userId',
        sourceKey: 'id',
    });

    Recipe.hasMany(Rating, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        as: 'ratings',
    });

    Rating.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'id',
    });

    Rating.belongsTo(Recipe, {
        foreignKey: 'recipeId',
        targetKey: 'id',
    });

    Recipe.hasOne(Nutrition, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        as: 'nutrition',
    });

    Nutrition.belongsTo(Recipe, {
        foreignKey: 'recipeId',
        targetKey: 'id',
    });

    User.hasMany(Recipe, {
        foreignKey: 'authorId',
        sourceKey: 'id',
    });

    Recipe.belongsTo(User, {
        foreignKey: 'authorId',
        targetKey: 'id',
        as: 'author',
    });

    Recipe.hasMany(RecipePhoto, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        as: 'photos',
    });

    RecipePhoto.belongsTo(Recipe, {
        foreignKey: 'recipeId',
        targetKey: 'id',
    });

    Recipe.hasMany(RecipePart, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
        as: 'parts',
    });

    RecipePart.belongsTo(Recipe, {
        foreignKey: 'recipeId',
        targetKey: 'id',
    });

    RecipePart.hasMany(Ingridient, {
        foreignKey: 'partId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        as: 'ingridients',
    });

    Ingridient.belongsTo(RecipePart, {
        foreignKey: 'partId',
        targetKey: 'id',
    });

    Recipe.hasMany(Ingridient, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
    });

    Ingridient.belongsTo(Recipe, {
        foreignKey: 'recipeId',
        targetKey: 'id',
    });

    Recipe.hasMany(Comment, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        as: 'comments',
    });

    Comment.belongsTo(Recipe, {
        foreignKey: 'recipeId',
        targetKey: 'id',
    });

    User.hasMany(Comment, {
        foreignKey: 'userId',
        sourceKey: 'id',
    });

    Comment.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'author',
    });

    Comment.hasMany(Comment, {
        foreignKey: 'parentId',
        sourceKey: 'id',
        as: 'replies',
    });

    Comment.belongsTo(Comment, {
        foreignKey: 'parentId',
        targetKey: 'id',
        as: 'parent',
    });
}

export default buildRelations;
