import Category, { CategoryAttrs } from 'backend/models/Category';
import Recipe, { RecipeAttrs } from 'backend/models/Recipe';
import RecipeCategory from 'backend/models/RecipeCategory';
import { UserAttrs } from 'backend/models/User';
import { ErrorTypes } from 'backend/types/errors';
import { Op, UniqueConstraintError, WhereOptions } from 'sequelize';
import CategoriesService from '../categories';
import { attributes, includeArray, group, includeArrayRequired } from './searchOptions';
import { RecipeData } from './types';

namespace RecipesService {
    export async function createRecipe(recipeData: RecipeData, authorId: UserAttrs['id']) {
        return await Recipe.create({ ...recipeData, authorId });
    }

    export async function getRecipe(recipeId: Recipe['id']) {
        return await Recipe.findByPk(recipeId, {
            attributes,
            include: includeArray,
            group,
        });
    }

    export async function getCompletedRecipes(limit?: number, offset?: number, categoryIds?: CategoryAttrs['id'][]) {
        const whereOptions: WhereOptions<RecipeAttrs> = {
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
        };

        if (categoryIds !== undefined) {
            whereOptions['$categories.id$'] = categoryIds;
        }

        const [count, results] = await Promise.all([
            Recipe.count({
                where: whereOptions,
                include: {
                    model: Category,
                    as: 'categories',
                },
            }),
            Recipe.findAll({
                where: whereOptions,
                offset,
                limit,
                attributes: {
                    include: attributes.include,
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: includeArrayRequired,
                group,
            }),
        ]);

        return { count, results };
    }

    export async function getAllRecipes(limit?: number, offset?: number) {
        return await Recipe.findAll({
            offset,
            limit,
            attributes,
            include: includeArray,
            group,
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
