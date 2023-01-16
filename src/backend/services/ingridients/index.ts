import Ingridient, { IngridientAttrs } from 'backend/models/Ingridient';
import { ErrorTypes } from 'backend/types/errors';
import { IngridientCreationData, IngridientEditingData } from './types';

namespace IngridientsService {
    export async function createIngridient(ingridientData: IngridientCreationData) {
        return await Ingridient.create(ingridientData);
    }

    export async function getIngridient(ingridientData: Partial<IngridientAttrs>) {
        return await Ingridient.findOne({ where: ingridientData });
    }

    export async function getIngridients(ingridientsData: Partial<IngridientAttrs>) {
        return await Ingridient.findAll({ where: ingridientsData });
    }

    export async function editIngridient(
        ingridientData: Partial<IngridientEditingData>,
        ingridientId: Ingridient['id']
    ) {
        const ingridient = await getIngridientWithErrorCheck(ingridientId);

        return await ingridient.update(ingridientData);
    }

    export async function deleteIngridient(ingridientId: Ingridient['id']) {
        const ingridient = await getIngridientWithErrorCheck(ingridientId);

        await ingridient.destroy();
    }

    async function getIngridientWithErrorCheck(ingridientId: Ingridient['id']) {
        const ingridient = await getIngridient({ id: ingridientId });

        if (ingridient === null) {
            throw new Error('Ingridient with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        return ingridient;
    }
}

export default IngridientsService;
