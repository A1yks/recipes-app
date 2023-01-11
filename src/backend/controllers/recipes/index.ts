import { CreateRecipeReq, DeleteRecipeReq, EditRecipeReq, GetRecipeReq, GetRecipesReq } from './types';

namespace RecipesController {
    export async function createRecipe(req: Server.Request<CreateRecipeReq>, res: Server.Response) {}

    export async function getRecipe(req: Server.Request<never, GetRecipeReq>, res: Server.Response) {}

    export async function getRecipes(req: Server.Request<never, never, GetRecipesReq>, res: Server.Response) {}

    export async function deleteRecipe(req: Server.Request<DeleteRecipeReq>, res: Server.Response) {}

    export async function editRecipe(req: Server.Request<EditRecipeReq>, res: Server.Response) {}
}

export default RecipesController;
