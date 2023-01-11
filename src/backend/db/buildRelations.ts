import Category from 'backend/models/Category';
import Instruction from 'backend/models/Instruction';
import Nutrition from 'backend/models/Nutrition';
import Rating from 'backend/models/Rating';
import Recipe from 'backend/models/Recipe';
import RecipeCategory from 'backend/models/RecipeCategory';
import RefreshToken from 'backend/models/RefreshToken';
import User from 'backend/models/User';
import UserInfo from 'backend/models/UserInfo';

function buildRelations() {
    User.hasOne(RefreshToken, {
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });

    RefreshToken.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'userId',
    });

    User.hasOne(UserInfo, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'info',
        onDelete: 'CASCADE',
    });

    UserInfo.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'userId',
    });

    Recipe.belongsToMany(Category, {
        through: RecipeCategory,
        foreignKey: 'recipeId',
        otherKey: 'categoryId',
    });

    Category.belongsToMany(Recipe, {
        through: RecipeCategory,
        foreignKey: 'categoryId',
        otherKey: 'recipeId',
    });

    Recipe.hasMany(Instruction, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
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
    });

    Rating.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'id',
    });

    Rating.belongsTo(Recipe, {
        foreignKey: 'ratingId',
        targetKey: 'id',
    });

    Recipe.hasOne(Nutrition, {
        foreignKey: 'recipeId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
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
}

export default buildRelations;
