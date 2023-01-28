import { Card, CardMedia, CardContent, Typography, Link, Grid, IconButton, Divider, Tooltip } from '@mui/material';
import getImageUrl from 'src/utils/getImageUrl';
import { RecipeCardProps } from './RecipeCard.types';
import DeleteIcon from '@mui/icons-material/Delete';

function RecipeCard(props: RecipeCardProps) {
    const { recipe, cardMediaProps, cardContentProps, authorView, onDelete, sx, ...cardProps } = props;

    return (
        <Card variant="outlined" sx={{ maxWidth: '22.875rem', ...sx }} {...cardProps}>
            <CardMedia
                image={recipe.pictureUrl === null ? '/images/noimage.png' : getImageUrl(recipe.pictureUrl, 'recipes')}
                sx={{ width: '100%', height: '15.5rem' }}
                {...cardMediaProps}
            />
            <Grid container component={CardContent} columns={24} pb={2} alignItems="center" gap={2}>
                <Grid
                    item
                    xs
                    {...cardContentProps}
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', ...cardContentProps?.sx }}
                >
                    <Link href={`/recipes/${(authorView ? 'edit/' : '') + recipe.id}`} noWrap>
                        {recipe.title}
                    </Link>
                </Grid>
                {authorView && (
                    <Grid container item width="auto" gap={2} justifyContent="flex-end">
                        <Grid item>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item>
                            <Tooltip title="Delete recipe">
                                <IconButton onClick={onDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
}

export default RecipeCard;
