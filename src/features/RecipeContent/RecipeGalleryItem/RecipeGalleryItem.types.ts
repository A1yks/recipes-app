import { RecipePhotoAttrs } from '@backend/models/RecipePhoto';

export type RecipeGalleryItemProps = {
    photo: RecipePhotoAttrs;
    canEdit: boolean;
    isDeleting?: boolean;
    onDeleteIconClick?: () => void;
};
