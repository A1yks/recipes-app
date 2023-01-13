import Category from 'backend/models/Category';
import Instruction from 'backend/models/Instruction';
import Nutrition from 'backend/models/Nutrition';
import Recipe from 'backend/models/Recipe';
import { UserAttrs } from 'backend/models/User';
import { IncludeOptions } from 'sequelize';
import { RecipeData } from './types';

const includeArray: IncludeOptions[] = [
    {
        model: Category,
        as: 'categories',
    },
    {
        model: Instruction,
        as: 'instructions',
    },
    {
        model: Nutrition,
        as: 'nutrition',
    },
];

namespace RecipesService {
    export async function createRecipe(recipeData: RecipeData, authorId: UserAttrs['id']) {
        return await Recipe.create({ ...recipeData, authorId });
    }

    export async function getRecipe(recipeId: Recipe['id']) {
        return await Recipe.findByPk(recipeId, {
            include: includeArray,
        });
    }

    export async function getRecipes(limit: number, offset: number, findCompletedRecipes = true) {
        const include: IncludeOptions[] = findCompletedRecipes
            ? includeArray.map((o) => {
                  o.required = true;
                  return o;
              })
            : includeArray;

        return await Recipe.findAll({
            offset,
            limit,
            include,
        });
    }

    export async function deleteRecipe(recipeId: Recipe['id']) {
        const deletedRows = await Recipe.destroy({ where: { id: recipeId } });

        return deletedRows > 0;
    }

    export async function editRecipe(recipeData: RecipeData, recipeId: Recipe['id']) {
        const recipe = await Recipe.findByPk(recipeId);

        if (recipe === null) {
            return null;
        }

        return await recipe.update(recipeData);
    }
}

export default RecipesService;
