import { checkUserPermissionsForOperationsWithRecipe } from '@backend/controllers/recipes/permissions';
import { UserAttrs } from '@backend/models/User';
import { PermissionsValidationCallback } from '../middleware/permissions';

function checkRecipePermissionHelper(callback: PermissionsValidationCallback) {
    return async (req: Server.Request, userId: UserAttrs['id']) => {
        const userCanModifyRecipe = await checkUserPermissionsForOperationsWithRecipe(req, userId);

        if (!userCanModifyRecipe) return false;

        return await callback(req, userId);
    };
}

export default checkRecipePermissionHelper;
