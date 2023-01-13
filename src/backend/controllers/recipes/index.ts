import RecipesService from 'backend/services/recipes';
import logger from 'backend/utils/logger';
import { CreateRecipeReq, DeleteRecipeReq, EditRecipeReq, GetRecipeReq, GetRecipesReq } from './types';

namespace RecipesController {
    export async function createRecipe(req: Server.Request<CreateRecipeReq>, res: Server.Response) {
        try {
            const recipe = await RecipesService.createRecipe(req.body, req.userId!);
            const recipeJson = recipe.toJSON() as typeof recipe;

            recipeJson.categories = [];
            recipeJson.instructions = [];
            recipeJson.nutrition = null;

            res.status(201).json({ data: recipeJson });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while creating new recipe' });
        }
    }

    export async function getRecipe(req: Server.Request<never, GetRecipeReq>, res: Server.Response) {}

    export async function getRecipes(req: Server.Request<never, never, GetRecipesReq>, res: Server.Response) {}

    export async function deleteRecipe(req: Server.Request<DeleteRecipeReq>, res: Server.Response) {}

    export async function editRecipe(req: Server.Request<EditRecipeReq>, res: Server.Response) {}
}

export default RecipesController;
