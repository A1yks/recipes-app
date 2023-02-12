import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import useUserRecipes from './hooks/useUserRecipes';
import ContentLayout from 'src/layouts/ContentLayout';
import Dialog from 'src/components/Dialog';
import ControlledInput from 'src/components/ControlledInput';
import Button from '@mui/material/Button';
import LoadingButton from 'src/components/LoadingButton';
import RecipeCard from 'src/components/RecipeCard';
import useResponsive from './hooks/useResponsive';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import useUserRecipesPagination from './hooks/useUserRecipesPagination';
import Pagination from 'src/components/Pagination';
import PageLoader from 'src/components/PageLoader';

const pageTitle = 'My recipes';

function UserRecipes() {
    const { page, recipes, totalPages, showLoader, showPagination, changePageHandler } = useUserRecipesPagination();
    const {
        isCreateRecipeDialogOpened,
        isDeleteRecipeDialogOpened,
        isCreatingRecipe,
        isDeletingRecipe,
        recipeName,
        control,
        openCreateRecipeDialogHandler,
        openDeleteRecipeDialogHandler,
        closeCreateRecipeDialogHandler,
        closeDeleteRecipeDialogHandler,
        changeRecipeNameHandler,
        createRecipeHandler,
        deleteRecipeHandler,
    } = useUserRecipes();

    const { cols, matchesMd } = useResponsive();

    if (showLoader) {
        return (
            <ContentLayout title={pageTitle}>
                <PageLoader />
            </ContentLayout>
        );
    }

    const pagination = showPagination ? (
        <Pagination count={totalPages} page={page} onChange={changePageHandler} hrefPattern="/profile/recipes" />
    ) : null;

    return (
        <ContentLayout title={pageTitle} childrenWrapperSx={{ py: 4 }}>
            <Grid container position="relative">
                <Grid item sx={{ ml: 'auto', mr: { xs: 'auto', sm: 0 } }}>
                    <Button variant="contained" onClick={openCreateRecipeDialogHandler}>
                        Create new recipe
                    </Button>
                </Grid>
                {showPagination && (
                    <Grid
                        item
                        m="auto"
                        sx={
                            matchesMd
                                ? {
                                      position: 'absolute',
                                      left: '50%',
                                      top: '50%',
                                      transform: `translate(-50%, -50%)`,
                                  }
                                : {
                                      mt: 4,
                                      '& nav': {
                                          display: 'flex',
                                          '& ul': {
                                              mx: 'auto',
                                          },
                                      },
                                  }
                        }
                        xs={matchesMd ? undefined : 12}
                    >
                        {pagination}
                    </Grid>
                )}
            </Grid>
            {recipes.length === 0 ? (
                <Grid container flex={1}>
                    <Grid
                        item
                        component={Typography}
                        m="auto"
                        p={6}
                        variant="h6"
                        fontWeight={400}
                        color="gray"
                        textAlign="center"
                    >
                        You don&apos;t have any recipes yet. Click on &quot;Create new recipe&quot; button to add a new
                        recipe.
                    </Grid>
                </Grid>
            ) : (
                <Grid container direction="column">
                    <Grid item>
                        <Box
                            sx={{
                                mt: 4,
                                display: 'grid',
                                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                                gap: 3,
                            }}
                        >
                            {recipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    sx={{
                                        mx: { xs: 'auto', sm: 0 },
                                        maxWidth: { xs: '20rem', sm: 'none' },
                                        width: { xs: '100%', sm: 'auto' },
                                    }}
                                    recipe={recipe}
                                    authorView
                                    onDelete={openDeleteRecipeDialogHandler(recipe.id)}
                                />
                            ))}
                        </Box>
                    </Grid>
                    {showPagination && (
                        <Grid item m="auto" pt={4}>
                            {pagination}
                        </Grid>
                    )}
                    <ConfirmationDialog
                        isOpened={isDeleteRecipeDialogOpened}
                        isLoading={isDeletingRecipe}
                        title="Delete recipe"
                        contentText="Do you really want to delete the recipe?"
                        onSubmit={deleteRecipeHandler}
                        onClose={closeDeleteRecipeDialogHandler}
                    />
                </Grid>
            )}
            <Dialog
                dialogProps={{ maxWidth: 'sm', fullWidth: true }}
                isOpened={isCreateRecipeDialogOpened}
                title="Create new recipe"
                contentText="Enter recipe name"
                onClose={closeCreateRecipeDialogHandler}
                content={
                    <Box component="form" id="create-recipe-form" onSubmit={createRecipeHandler} sx={{ mt: 2 }}>
                        <ControlledInput
                            name="Recipe name"
                            control={control}
                            value={recipeName}
                            onChange={changeRecipeNameHandler}
                            variant="standard"
                            label="Recipe name"
                            fullWidth
                            autoFocus
                        />
                    </Box>
                }
                actions={
                    <>
                        <Button onClick={closeCreateRecipeDialogHandler} disabled={isCreatingRecipe}>
                            Cancel
                        </Button>
                        <LoadingButton loading={isCreatingRecipe} type="submit" form="create-recipe-form">
                            Create
                        </LoadingButton>
                    </>
                }
            />
        </ContentLayout>
    );
}

export default UserRecipes;
