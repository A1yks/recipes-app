import { RecipeAttrs } from '@backend/models/Recipe';
import { CardContentProps, CardMediaProps, CardProps } from '@mui/material';

export type RecipeCardProps = CardProps & {
    recipe: RecipeAttrs;
    authorView?: boolean;
    cardMediaProps?: CardMediaProps;
    cardContentProps?: CardContentProps;
    onDelete?: () => MaybePromise<void>;
};
