import { Avatar, Box, Button, Menu, MenuItem, Link, useTheme, IconButton, useMediaQuery } from '@mui/material';
import useProfileMenu from './hooks/useProfileMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { profileNavigationMenu } from 'src/constants/navigation';

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
        openLinkHandler,
        logoutHandler,
    } = useProfileMenu();
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
    const avatarSize = matchesSm ? 30 : 40;
    const buttonSize = matchesSm ? 'small' : 'medium';

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
                    size={buttonSize}
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
            <IconButton onClick={openMenuHandler} size={buttonSize}>
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
                {profileNavigationMenu.map(({ title, href, icon: Icon }) => (
                    <MenuItem key={title} onClick={openLinkHandler(href)}>
                        <ListItemIcon>
                            <Icon fontSize="small" />
                        </ListItemIcon>
                        {title}
                    </MenuItem>
                ))}
                <MenuItem onClick={logoutHandler}>
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
