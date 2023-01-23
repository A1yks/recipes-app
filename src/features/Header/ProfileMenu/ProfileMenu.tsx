import { Avatar, Box, Button, Menu, MenuItem, Link, useTheme, IconButton, useMediaQuery } from '@mui/material';
import useProfileMenu from './hooks/useProfileMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';

function ProfileMenu(props: Props.WithSx) {
    const {
        isAuthorized,
        isMenuOpened,
        menuAnchorEl,
        avatarUrl,
        avatarColor,
        loginFirstLetter,
        openMenuHandler,
        closeMenuHandler,
    } = useProfileMenu();
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
    const avatarSize = matchesSm ? 30 : 40;

    if (!isAuthorized) {
        return (
            <Link
                href="/auth/login"
                sx={{
                    '&:hover': {
                        textDecoration: 'none',
                    },
                    ...props.sx,
                }}
            >
                <Button
                    variant="outlined"
                    size={matchesSm ? 'small' : 'medium'}
                    sx={{
                        color: '#000',
                        borderColor: '#000',
                        '&:hover': { color: theme.palette.primary.main },
                    }}
                >
                    Login
                </Button>
            </Link>
        );
    }

    return (
        <Box sx={props.sx}>
            <IconButton onClick={openMenuHandler} size={matchesSm ? 'small' : 'medium'}>
                <Avatar
                    src={avatarUrl}
                    sx={{
                        bgcolor: avatarColor,
                        cursor: 'pointer',
                        width: avatarSize,
                        height: avatarSize,
                        fontSize: avatarSize / 2,
                    }}
                >
                    {loginFirstLetter}
                </Avatar>
            </IconButton>
            <Menu anchorEl={menuAnchorEl} open={isMenuOpened} onClose={closeMenuHandler}>
                <MenuItem onClick={closeMenuHandler}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={closeMenuHandler}>
                    <ListItemIcon>
                        <MenuBookIcon fontSize="small" />
                    </ListItemIcon>
                    My recipes
                </MenuItem>
                <MenuItem onClick={closeMenuHandler}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={closeMenuHandler}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default ProfileMenu;
