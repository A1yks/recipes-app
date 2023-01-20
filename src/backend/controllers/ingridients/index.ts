import IngridientsService from '@backend/services/ingridients';
import { ErrorTypes } from '@backend/types/errors';
import errorsHandler from '@backend/utils/errorsHander';
import { CreateIngridientReq, DeleteIngridientReq, EditIngridientReq, GetIngridientsReq } from './types';

namespace IngridientsController {
    export async function createIngridient(req: Server.Request<CreateIngridientReq>, res: Server.Response) {
        const { recipePartId, recipeId, ingridientData } = req.body;

        try {
            const ingridient = await IngridientsService.createIngridient({
                ...ingridientData,
                partId: recipePartId,
                recipeId,
            });

            res.status(201).json({ data: ingridient });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while creating new ingridient',
            });
        }
    }

    export async function getIngridients(req: Server.Request<never, GetIngridientsReq>, res: Server.Response) {
        const { recipeId } = req.params;

        try {
            const ingridients = await IngridientsService.getIngridients({ recipeId });

            res.status(200).json({ data: ingridients });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining recipe ingridients',
            });
        }
    }

    export async function editIngridient(req: Server.Request<EditIngridientReq>, res: Server.Response) {
        const { ingridientId, ingridientData } = req.body;

        try {
            const updatedIngridient = IngridientsService.editIngridient(ingridientData, ingridientId);

            res.status(200).json({ data: updatedIngridient });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while editing the ingridient',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function deleteIngridient(req: Server.Request<DeleteIngridientReq>, res: Server.Response) {
        const { ingridientId } = req.body;

        try {
            await IngridientsService.deleteIngridient(ingridientId);
            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the ingridient',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default IngridientsController;
