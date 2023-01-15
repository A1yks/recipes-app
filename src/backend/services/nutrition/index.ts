import Nutrition, { NutritionAttrs } from 'backend/models/Nutrition';
import { RecipeAttrs } from 'backend/models/Recipe';
import { NutritionData } from './types';

namespace NutritionService {
    export async function createNutrition(nutritionData: NutritionData, recipeId: RecipeAttrs['id']) {
        return await Nutrition.create({
            ...nutritionData,
            recipeId,
        });
    }

    export async function getNutrition(nutritionData: Partial<NutritionAttrs>) {
        return await Nutrition.findOne({ where: nutritionData });
    }

    export async function editNutrition(nutritionData: Partial<NutritionData>, nutritionId: Nutrition['id']) {
        const nutrition = await Nutrition.findByPk(nutritionId);

        if (nutrition === null) {
            return null;
        }

        return await nutrition.update(nutritionData);
    }
}

export default NutritionService;
