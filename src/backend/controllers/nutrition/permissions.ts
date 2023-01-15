import { UserAttrs } from 'backend/models/User';
import NutritionService from 'backend/services/nutrition';
import { EditNutritionReq } from './types';

async function checkUserPermissionsForOperationsWithNutrition(
    userId: UserAttrs['id'],
    req: Server.Request<EditNutritionReq>
) {
    const { nutritionId, recipeId } = req.body;
    const nutrition = await NutritionService.getNutrition({ id: nutritionId, recipeId });

    return nutrition !== null;
}

export default checkUserPermissionsForOperationsWithNutrition;
