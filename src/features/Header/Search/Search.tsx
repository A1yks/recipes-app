import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, Fade, TextField, useMediaQuery, useTheme } from '@mui/material';
import useSearch from './hooks/useSearch';
import CloseIcon from '@mui/icons-material/Close';

function Search(props: Props.WithSx) {
    const { isSearchOpened, openSearchHandler, closeSearchHandler } = useSearch();
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <SearchIcon
                fontSize={matchesSm ? 'medium' : 'large'}
                className="hover-color-primary"
                sx={{ cursor: 'pointer', ...props.sx }}
                onClick={openSearchHandler}
            />
            <Fade in={isSearchOpened}>
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '80%',
                        inset: 0,
                        bgcolor: theme.palette.neutral.main,
                        zIndex: 10,
                        mb: '2rem',
                    }}
                >
                    <Container sx={{ height: '100%', display: 'flex', position: 'relative' }}>
                        <TextField
                            placeholder="Recipe name"
                            variant="standard"
                            fullWidth
                            sx={{ height: '50%', marginY: 'auto' }}
                            InputProps={{ sx: { height: '100%' } }}
                        />
                        <CloseIcon
                            onClick={closeSearchHandler}
                            fontSize={matchesSm ? 'medium' : 'large'}
                            sx={{
                                cursor: 'pointer',
                                position: 'absolute',
                                right: 0,
                                top: '50%',
                                transform: `translate(-50%, -50%)`,
                            }}
                        />
                    </Container>
                </Box>
            </Fade>
        </>
    );
}

export default Search;
