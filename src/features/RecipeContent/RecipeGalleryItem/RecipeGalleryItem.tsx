import { Box, Tooltip } from '@mui/material';
import getImageUrl from 'src/utils/getImageUrl';
import { RecipeGalleryItemProps } from './RecipeGalleryItem.types';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { memo } from 'react';

function RecipeGalleryItem(props: RecipeGalleryItemProps) {
    const { photo, canEdit } = props;

    return (
        <Box
            sx={{
                width: 1,
                pt: '56.25%',
                position: 'relative',
                '&:hover .gallery-item-actions': {
                    opacity: 1,
                    pointerEvents: 'initial',
                },
            }}
        >
            <Box
                component={Image}
                src={getImageUrl(photo.fileName, 'recipes')}
                priority
                fill
                alt=""
                sizes="(max-width: 1200px) 100vw,
                75vw"
                sx={{ objectFit: 'cover' }}
            />
            {canEdit && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        width: 1,
                        height: 1,
                        opacity: 0,
                        pointerEvents: 'none',
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        transition: 'opacity 0.3s ease',
                        p: 1,
                        display: 'flex',
                    }}
                    className="gallery-item-actions"
                >
                    <Tooltip title="Delete image">
                        <DeleteIcon
                            onClick={props.onDeleteIconClick}
                            className="hover-color-primary"
                            sx={{
                                cursor: 'pointer',
                                color: '#fff',
                                m: 'auto',
                                fontSize: {
                                    sm: 48,
                                    xs: 36,
                                },
                            }}
                        />
                    </Tooltip>
                </Box>
            )}
        </Box>
    );
}

export default memo(RecipeGalleryItem);
