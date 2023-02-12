import { Grid } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton';
import useRecipeGallery from './hooks/useRecipeGallery';
import Carousel from 'src/components/Carousel';
import RecipeGalleryItem from '../RecipeGalleryItem';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import useGalleryCarousel from './hooks/useGalleryCarousel';

function RecipeGallery(props: Props.WithSx) {
    const {
        photos,
        canEdit,
        isUploading,
        isDeleting,
        isDialogOpened,
        uploadImagesHandler,
        deleteImageHandler,
        openDialogHandler,
        closeDialogHandler,
    } = useRecipeGallery();
    const { currentSlide, slideChangeHandler } = useGalleryCarousel();

    return (
        <Grid container direction="column" gap={3} alignItems="center" sx={props.sx}>
            {canEdit && (
                <Grid container item>
                    <Grid
                        item
                        component={LoadingButton}
                        loading={isUploading}
                        variant="contained"
                        fullWidth
                        xs={8}
                        sm={4}
                        md={3}
                        m="auto"
                        onClick={uploadImagesHandler}
                    >
                        Upload images
                    </Grid>
                </Grid>
            )}
            {photos.length > 0 && (
                <Grid container item>
                    <Grid item xs={12} sx={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                        <Carousel
                            selectedItem={currentSlide}
                            showIndicators={photos.length > 1}
                            showStatus={photos.length > 1}
                            infiniteLoop
                            onChange={slideChangeHandler}
                        >
                            {photos.map((photo) => (
                                <RecipeGalleryItem
                                    key={photo.id}
                                    photo={photo}
                                    canEdit={canEdit}
                                    isDeleting={isDeleting}
                                    onDeleteIconClick={openDialogHandler(photo.id)}
                                />
                            ))}
                        </Carousel>
                    </Grid>
                </Grid>
            )}
            <ConfirmationDialog
                isOpened={isDialogOpened}
                onClose={closeDialogHandler}
                onCancel={closeDialogHandler}
                onSubmit={deleteImageHandler}
                isLoading={isDeleting}
                dialogProps={{ fullWidth: true, maxWidth: 'xs' }}
                title="Delete photo"
                contentText="Do you really want to delete this photo?"
            />
        </Grid>
    );
}

export default RecipeGallery;
