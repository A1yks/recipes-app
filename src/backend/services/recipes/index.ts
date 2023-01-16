import Category, { CategoryAttrs } from 'backend/models/Category';
import Ingridient from 'backend/models/Ingridient';
import Instruction from 'backend/models/Instruction';
import Nutrition from 'backend/models/Nutrition';
import Recipe from 'backend/models/Recipe';
import RecipeCategory from 'backend/models/RecipeCategory';
import RecipePart from 'backend/models/RecipePart';
import RecipePhoto from 'backend/models/RecipePhoto';
import { UserAttrs } from 'backend/models/User';
import { ErrorTypes } from 'backend/types/errors';
import { IncludeOptions, Op, UniqueConstraintError } from 'sequelize';
import CategoriesService from '../categories';
import { RecipeData } from './types';

const includeArray: IncludeOptions[] = [
    {
        model: Category,
        as: 'categories',
    },
    {
        model: Instruction,
        as: 'instructions',
        separate: true,
        order: [['stepNumber', 'ASC']],
    },
    {
        model: Nutrition,
        as: 'nutrition',
    },
    {
        model: RecipePhoto,
        as: 'photos',
    },
    {
        model: RecipePart,
        as: 'parts',
        include: [
            {
                model: Ingridient,
                as: 'ingridients',
            },
        ],
    },
];
const includeArrayRequired = includeArray.map((o) => ({ ...o, required: true }));

namespace RecipesService {
    export async function createRecipe(recipeData: RecipeData, authorId: UserAttrs['id']) {
        return await Recipe.create({ ...recipeData, authorId });
    }

    export async function getRecipe(recipeId: Recipe['id']) {
        return await Recipe.findByPk(recipeId, {
            include: includeArray,
        });
    }

    export async function getRecipes(limit?: number, offset?: number, findCompletedRecipes = true) {
        if (findCompletedRecipes) {
            return await Recipe.findAll({
                where: {
                    description: {
                        [Op.not]: null,
                    },
                    pictureUrl: {
                        [Op.not]: null,
                    },
                    prepTime: {
                        [Op.not]: null,
                    },
                    servings: {
                        [Op.not]: null,
                    },
                },
                offset,
                limit,
                include: includeArrayRequired,
            });
        }

        return await Recipe.findAll({
            offset,
            limit,
            include: includeArray,
        });
    }

    export async function editRecipe(recipeData: Partial<RecipeData>, recipeId: Recipe['id']) {
        const recipe = await Recipe.findByPk(recipeId);

        if (recipe === null) {
            return null;
        }

        return await recipe.update(recipeData);
    }

    export async function deleteRecipe(recipeId: Recipe['id']) {
        const deletedRows = await Recipe.destroy({ where: { id: recipeId } });

        return deletedRows > 0;
    }

    export async function addCategoryToRecipe(categoryId: CategoryAttrs['id'], recipeId: Recipe['id']) {
        try {
            await checkRecipeAndCategoryExist(categoryId, recipeId);
            await RecipeCategory.create({ categoryId, recipeId });
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                throw new Error('Category with provided id has already been added to the recipe', {
                    cause: ErrorTypes.ALREADY_EXISTS,
                });
            }

            throw err;
        }
    }

    export async function deleteCategoryFromRecipe(categoryId: CategoryAttrs['id'], recipeId: Recipe['id']) {
        await checkRecipeAndCategoryExist(categoryId, recipeId);

        const recipeCategory = await RecipeCategory.findOne({ where: { categoryId, recipeId } });

        if (recipeCategory === null) {
            throw new Error('Category with provided id does not belong to the recipe', {
                cause: ErrorTypes.DELETION_ERROR,
            });
        }

        const deletedRows = await RecipeCategory.destroy({ where: { categoryId, recipeId } });

        return deletedRows > 0;
    }

    export async function recipeExists(recipeId: Recipe['id']) {
        const recipe = await getRecipe(recipeId);

        return recipe !== null;
    }

    async function checkRecipeAndCategoryExist(categoryId: CategoryAttrs['id'], recipeId: Recipe['id']) {
        const [categoryExists, recipeExists] = await Promise.all([
            await CategoriesService.categoryExists(categoryId),
            await RecipesService.recipeExists(recipeId),
        ]);

        if (!recipeExists) {
            throw new Error('Recipe with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        if (!categoryExists) {
            throw new Error('Category with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }
    }
}

export default RecipesService;
