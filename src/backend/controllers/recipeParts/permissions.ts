import RecipePartsService from '@backend/services/recipeParts';
import checkRecipePermissionHelper from '@backend/utils/checkRecipePermissionsHelper';
import { DeleteRecipePartReq, EditRecipePartNameReq } from './types';

async function checkRecipePartsPermissions(req: Server.Request<EditRecipePartNameReq | DeleteRecipePartReq>) {
    const { recipeId, recipePartId } = req.body;
    const recipePart = await RecipePartsService.getPart({ id: recipePartId, recipeId });

    return recipePart !== null;
}

export const checkUserPermissionsForOperationsWithRecipePart = checkRecipePermissionHelper(checkRecipePartsPermissions);
