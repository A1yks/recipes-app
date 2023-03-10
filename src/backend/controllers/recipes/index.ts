import RatingService from '@backend/services/rating';
import RecipesService from '@backend/services/recipes';
import { ErrorTypes } from '@backend/types/errors';
import errorsHandler from '@backend/utils/errorsHander';
import logger from '@backend/utils/logger';
import queryParamToArray from '@backend/utils/queryParamToArray';
import {
    AddCategoryToRecipeReq,
    CreateRecipeReq,
    DeleteCategoryFromRecipeReq,
    DeleteRecipeReq,
    EditRecipeReq,
    GetRecipeReq,
    GetRecipesReq,
} from './types';

namespace RecipesController {
    export async function createRecipe(req: Server.Request<CreateRecipeReq>, res: Server.Response) {
        try {
            const recipe = await RecipesService.createRecipe(req.body, req.userId!);
            const recipeJson = recipe.toJSON() as typeof recipe;

            recipeJson.categories = [];
            recipeJson.instructions = [];
            recipeJson.parts = [];
            recipeJson.photos = [];
            recipeJson.nutrition = null;

            res.status(201).json({ data: recipeJson });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while creating new recipe' });
        }
    }

    export async function getRecipe(req: Server.Request<never, GetRecipeReq>, res: Server.Response) {
        const { recipeId } = req.params;

        try {
            const [recipe, userRating] = await Promise.all([
                RecipesService.getRecipe({ id: recipeId }),
                req.userId !== undefined ? RatingService.getRating({ recipeId, userId: req.userId! }) : undefined,
            ]);

            res.status(200).json({ data: { recipe, userRating: userRating?.value } });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining the recipe',
            });
        }
    }

    export async function getRecipes(req: Server.Request<never, never, GetRecipesReq>, res: Server.Response) {
        const { page = 1, categoryIds: categoryIdsString } = req.query;
        const limit = 30;
        const offset = limit * (page - 1);

        try {
            const categoryIds = queryParamToArray(categoryIdsString);
            const results = await RecipesService.getCompletedRecipes(limit, offset, categoryIds);

            res.status(200).json({ data: results });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining recipes',
            });
        }
    }

    export async function editRecipe(req: Server.Request<EditRecipeReq>, res: Server.Response) {
        const { recipeId, ...recipeData } = req.body;

        try {
            const updatedRecipe = await RecipesService.editRecipe(recipeData, recipeId);

            if (updatedRecipe === null) {
                throw new Error('Recipe with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
            }

            res.status(200).json({ data: updatedRecipe });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while editing recipe data',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function deleteRecipe(req: Server.Request<DeleteRecipeReq>, res: Server.Response) {
        const { recipeId } = req.body;

        try {
            const deleted = await RecipesService.deleteRecipe(recipeId);

            if (!deleted) {
                return res.status(400).json({ error: 'Recipe was not deleted' });
            }

            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the recipe',
            });
        }
    }

    export async function addCategoryToRecipe(req: Server.Request<AddCategoryToRecipeReq>, res: Server.Response) {
        const { categoryId, recipeId } = req.body;

        try {
            await RecipesService.addCategoryToRecipe(categoryId, recipeId);
            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while adding the category to the recipe',
                expectedErrors: [
                    [ErrorTypes.NOT_FOUND, 404],
                    [ErrorTypes.ALREADY_EXISTS, 409],
                ],
            });
        }
    }

    export async function deleteCategoryFromRecipe(
        req: Server.Request<DeleteCategoryFromRecipeReq>,
        res: Server.Response
    ) {
        const { categoryId, recipeId } = req.body;

        try {
            const deleted = await RecipesService.deleteCategoryFromRecipe(categoryId, recipeId);

            if (!deleted) {
                return res.status(400).json({ error: 'Category was not deleted' });
            }

            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while adding the category to the recipe',
                expectedErrors: [
                    [ErrorTypes.NOT_FOUND, 404],
                    [ErrorTypes.ALREADY_EXISTS, 409],
                    [ErrorTypes.DELETION_ERROR, 400],
                ],
            });
        }
    }
}

export default RecipesController;
