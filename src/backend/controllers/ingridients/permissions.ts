import IngridientsService from '@backend/services/ingridients';
import RecipePartsService from '@backend/services/recipeParts';
import checkRecipePermissionHelper from '@backend/utils/checkRecipePermissionsHelper';
import { CreateIngridientReq, DeleteIngridientReq, EditIngridientReq } from './types';

async function checkIngridientsCreatePermissions(req: Server.Request<CreateIngridientReq>) {
    const { recipeId, recipePartId } = req.body;
    const recipePart = await RecipePartsService.getPart({ id: recipePartId, recipeId });

    return recipePart !== null;
}

async function checkIngridientsPermissions(req: Server.Request<EditIngridientReq | DeleteIngridientReq>) {
    const { recipePartId, recipeId, ingridientId } = req.body;
    const ingridient = await IngridientsService.getIngridient({ id: ingridientId, partId: recipePartId, recipeId });

    return ingridient !== null;
}

export const checkUserPermissionsForCreateIngridientOperation = checkRecipePermissionHelper(
    checkIngridientsCreatePermissions
);

export const checkUserPermissionsForOperationsWithIngridients =
    checkRecipePermissionHelper(checkIngridientsPermissions);
