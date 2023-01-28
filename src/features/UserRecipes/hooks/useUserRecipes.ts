import { recipeTitleFieldSchema } from '@backend/controllers/recipes/validation';
import { RecipeAttrs } from '@backend/models/Recipe';
import Joi from 'joi';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateRecipeMutation, useDeleteRecipeMutation } from 'src/services/api';
import useErrorsHandler from 'src/utils/errorsHandler';
import joiResolver from 'src/utils/joiResolver';

function useUserRecipes() {
    const [recipeName, setRecipeName] = useState('');
    const [createRecipeMutation, { isLoading: isCreatingRecipe }] = useCreateRecipeMutation();
    const [deleteRecipeMutation, { isLoading: isDeletingRecipe }] = useDeleteRecipeMutation();
    const [isCreateRecipeDialogOpened, setIsCreateRecipeDialogOpened] = useState(false);
    const [isDeleteRecipeDialogOpened, setIsDeleteRecipeDialogOpened] = useState(false);
    const recipeIdRef = useRef<RecipeAttrs['id'] | null>(null);
    const { control, handleSubmit, setValue } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(
            Joi.object({
                'Recipe name': recipeTitleFieldSchema.required(),
            })
        ),
    });

    const openCreateRecipeDialogHandler = () => setIsCreateRecipeDialogOpened(true);

    function closeCreateRecipeDialogHandler() {
        setIsCreateRecipeDialogOpened(false);
        setRecipeName('');
        setValue('Recipe name', '');
    }

    function openDeleteRecipeDialogHandler(recipeId: RecipeAttrs['id']) {
        return () => {
            recipeIdRef.current = recipeId;
            setIsDeleteRecipeDialogOpened(true);
        };
    }

    function closeDeleteRecipeDialogHandler() {
        setIsDeleteRecipeDialogOpened(false);
        recipeIdRef.current = null;
    }

    const createRecipe = useErrorsHandler(async () => {
        await createRecipeMutation(recipeName).unwrap();
        closeCreateRecipeDialogHandler();
    });

    const deleteRecipeHandler = useErrorsHandler(async () => {
        if (recipeIdRef.current !== null) {
            await deleteRecipeMutation(recipeIdRef.current).unwrap();
            closeDeleteRecipeDialogHandler();
        }
    });

    const changeRecipeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => setRecipeName(e.target.value);

    const createRecipeHandler = handleSubmit(createRecipe);

    return {
        isCreatingRecipe,
        isDeletingRecipe,
        isCreateRecipeDialogOpened,
        isDeleteRecipeDialogOpened,
        recipeName,
        control,
        openCreateRecipeDialogHandler,
        openDeleteRecipeDialogHandler,
        closeCreateRecipeDialogHandler,
        closeDeleteRecipeDialogHandler,
        changeRecipeNameHandler,
        createRecipeHandler,
        deleteRecipeHandler,
    };
}

export default useUserRecipes;
