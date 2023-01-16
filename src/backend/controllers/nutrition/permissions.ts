import NutritionService from 'backend/services/nutrition';
import checkRecipePermissionHelper from 'backend/utils/checkRecipePermissionsHelper';
import { EditNutritionReq } from './types';

async function checkNutritionPermissions(req: Server.Request<EditNutritionReq>) {
    const { nutritionId, recipeId } = req.body;
    const nutrition = await NutritionService.getNutrition({ id: nutritionId, recipeId });

    return nutrition !== null;
}

export const checkUserPermissionsForOperationsWithNutrition = checkRecipePermissionHelper(checkNutritionPermissions);
