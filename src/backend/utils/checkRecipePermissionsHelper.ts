import checkUserPermissionsForOperationsWithRecipe from 'backend/controllers/recipes/permissions';
import { UserAttrs } from 'backend/models/User';
import { PermissionsValidationCallback } from '../middleware/permissions';

function checkRecipePermissionHelper(callback: PermissionsValidationCallback) {
    return async (userId: UserAttrs['id'], req: Server.Request) => {
        const userCanModifyRecipe = await checkUserPermissionsForOperationsWithRecipe(userId, req);

        if (!userCanModifyRecipe) return false;

        return await callback(userId, req);
    };
}

export default checkRecipePermissionHelper;
