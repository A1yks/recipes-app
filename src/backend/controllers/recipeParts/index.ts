import RecipePartsService from '@backend/services/recipeParts';
import { ErrorTypes } from '@backend/types/errors';
import errorsHandler from '@backend/utils/errorsHander';
import { CreateRecipePartReq, DeleteRecipePartReq, EditRecipePartNameReq, GetRecipePartsReq } from './types';

namespace RecipePartsController {
    export async function createPart(req: Server.Request<CreateRecipePartReq>, res: Server.Response) {
        const { partName, recipeId } = req.body;

        try {
            const recipePart = await RecipePartsService.createPart(partName, recipeId);

            res.status(201).json({ data: recipePart });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while creating new recipe part',
            });
        }
    }

    export async function getParts(req: Server.Request<never, GetRecipePartsReq>, res: Server.Response) {
        const { recipeId } = req.params;

        try {
            const recipeParts = await RecipePartsService.getParts({ recipeId });

            res.status(200).json({ data: recipeParts });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining recipe parts',
            });
        }
    }

    export async function editPartName(req: Server.Request<EditRecipePartNameReq>, res: Server.Response) {
        const { partName, recipePartId } = req.body;

        try {
            const updatedRecipePart = await RecipePartsService.editPartName(recipePartId, partName);

            res.status(200).json({ data: updatedRecipePart });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while editing the name of recipe part',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function deletePart(req: Server.Request<DeleteRecipePartReq>, res: Server.Response) {
        const { recipePartId } = req.body;

        try {
            await RecipePartsService.deletePart(recipePartId);
            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the recipe part with',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default RecipePartsController;
