import NutritionService from 'backend/services/nutrition';
import { ErrorTypes } from 'backend/types/errors';
import errorsHandler from 'backend/utils/errorsHander';
import { CreateNutritionReq, EditNutritionReq, GetNutritionReq } from './types';

namespace NutritionController {
    export async function createNutrition(req: Server.Request<CreateNutritionReq>, res: Server.Response) {
        const { nutrition: nutritionData, recipeId } = req.body;

        try {
            const nutrition = await NutritionService.createNutrition(nutritionData, recipeId);

            res.status(201).json({ data: nutrition });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while creating nutrition data',
            });
        }
    }

    export async function getNutrition(req: Server.Request<never, GetNutritionReq>, res: Server.Response) {
        const { recipeId } = req.params;

        try {
            const nutrition = await NutritionService.getNutrition({ recipeId });

            if (nutrition === null) {
                throw new Error('Nutrition with provided recipeId does not exist', {
                    cause: ErrorTypes.NOT_FOUND,
                });
            }

            res.status(200).json({ data: nutrition });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining the nutrition data',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function editNutrition(req: Server.Request<EditNutritionReq>, res: Server.Response) {
        const { nutrition: nutritionData, nutritionId } = req.body;

        try {
            const updatedNutrition = await NutritionService.editNutrition(nutritionData, nutritionId);

            if (updatedNutrition === null) {
                throw new Error('Nutrition with provided id does not exist', {
                    cause: ErrorTypes.NOT_FOUND,
                });
            }

            res.status(200).json({ data: updatedNutrition });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while editing the nutrition data',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default NutritionController;
