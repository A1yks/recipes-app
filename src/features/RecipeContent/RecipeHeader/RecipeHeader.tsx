import { Grid, Typography, Tooltip, Divider, Rating } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import UserAvatar from 'src/components/UserAvatar';
import EditableText from 'src/components/EditableText';
import Joi from 'joi';
import { descriptionFieldSchema, recipeTitleFieldSchema } from '@backend/controllers/recipes/validation';
import useRecipeHeader from './hooks/useRecipeHeader';
import useRating, { ratingPrecision } from './hooks/useRating';

function RecipeHeader() {
    const {
        recipe,
        canUserModifyRating,
        hasDescription,
        formattedDate,
        isSaving,
        saveTitleHandler,
        saveDescriptionHandler,
    } = useRecipeHeader();
    const { isRatingRecipe, rateRecipeHandler } = useRating();

    return (
        <Grid container direction="column" wrap="nowrap">
            <Grid container item justifyContent="space-between" gap={3}>
                <Grid item flex={1}>
                    <EditableText
                        initialText={recipe.title}
                        typographyProps={{ variant: 'h2', fontWeight: 500 }}
                        editWrapperProps={{ editIconTooltipText: 'Edit title', editIconSx: { fontSize: 32 } }}
                        inputProps={{ name: 'title', label: 'Title' }}
                        validationSchema={Joi.object({ title: recipeTitleFieldSchema })}
                        isSaving={isSaving}
                        onSave={saveTitleHandler}
                    />
                </Grid>
                <Grid item>
                    <Tooltip title="Add to favorites">
                        <BookmarkBorderOutlinedIcon
                            className="hover-color-primary"
                            sx={{ cursor: 'pointer' }}
                            fontSize="large"
                        />
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid
                container
                item
                mt={3}
                gap={4}
                alignItems="center"
                sx={{
                    '& > div': {
                        gap: 1,
                        alignItems: 'center',
                        width: 'auto',
                    },
                    '& .text': {
                        color: 'GrayText',
                        lineHeight: '16px',
                    },
                    '& .icon': {
                        fontSize: 16,
                    },
                }}
            >
                <Grid container item>
                    <Grid item component={UserAvatar} user={recipe.author} size={32} />
                    <Grid item component={Typography} variant="caption" className="text">
                        {recipe?.author.login}
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid item component={DateRangeOutlinedIcon} className="icon" />
                    <Grid item component={Typography} variant="caption" className="text">
                        {formattedDate}
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid item component={ChatBubbleOutlineOutlinedIcon} className="icon" />
                    <Grid item component={Typography} variant="caption" className="text">
                        0
                    </Grid>
                </Grid>
                <Grid item>
                    <Rating
                        value={recipe.rating * ratingPrecision}
                        onChange={rateRecipeHandler}
                        precision={ratingPrecision}
                        disabled={isRatingRecipe}
                        readOnly={!canUserModifyRating}
                    />
                </Grid>
            </Grid>
            <Grid item component={Divider} mt={3} mb={3} />
            <Grid container item alignItems="center" md={8} wrap="nowrap">
                <Grid item flex={1}>
                    <EditableText
                        initialText={hasDescription ? recipe.description! : 'No description'}
                        editWrapperProps={{ editIconTooltipText: 'Edit description' }}
                        typographyProps={{
                            component: 'p',
                            color: !hasDescription ? 'gray' : undefined,
                            fontSize: '1.25rem',
                        }}
                        inputProps={{ name: 'description', label: 'Description', multiline: true }}
                        validationSchema={Joi.object({ description: descriptionFieldSchema })}
                        isSaving={isSaving}
                        onSave={saveDescriptionHandler}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default RecipeHeader;
