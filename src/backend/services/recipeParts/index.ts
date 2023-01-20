import Ingridient from '@backend/models/Ingridient';
import { RecipeAttrs } from '@backend/models/Recipe';
import RecipePart, { RecipePartAttrs } from '@backend/models/RecipePart';
import { ErrorTypes } from '@backend/types/errors';

namespace RecipePartsService {
    export async function createPart(partName: RecipePart['partName'], recipeId: RecipeAttrs['id']) {
        return await RecipePart.create({ partName, recipeId });
    }

    export async function getPart(partData: Partial<RecipePartAttrs>) {
        return await RecipePart.findOne({ where: partData });
    }

    export async function getParts(partsData: Partial<RecipePartAttrs>, include = true) {
        return await RecipePart.findAll({
            where: partsData,
            include: include ? { model: Ingridient, as: 'ingridients' } : undefined,
        });
    }

    export async function editPartName(partId: RecipePart['id'], partName: RecipePart['partName']) {
        const recipePart = await getPartWithErrorCheck(partId);

        return await recipePart.update({ partName });
    }

    export async function deletePart(partId: RecipePart['id']) {
        const recipePart = await getPartWithErrorCheck(partId);

        await recipePart.destroy();
    }

    async function getPartWithErrorCheck(partId: RecipePartAttrs['id']) {
        const recipePart = await getPart({ id: partId });

        if (recipePart === null) {
            throw new Error('Recipe part with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        return recipePart;
    }
}

export default RecipePartsService;
