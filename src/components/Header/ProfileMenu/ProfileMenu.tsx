import { Box, Button, Menu, MenuItem, Link, useTheme, IconButton, useMediaQuery } from '@mui/material';
import useProfileMenu from './hooks/useProfileMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { profileNavigationMenu } from 'src/constants/navigation';
import UserAvatar from 'src/components/UserAvatar';

function ProfileMenu(props: Props.WithSx) {
    const {
        isAuthorized,
        isMenuOpened,
        isLoggingOut,
        menuAnchorEl,
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
                <Button variant="black" size={buttonSize}>
                    Login
                </Button>
            </Link>
        );
    }

    return (
        <Box sx={props.sx}>
            <IconButton onClick={openMenuHandler} size={buttonSize}>
                <UserAvatar size={avatarSize} sx={{ cursor: 'pointer' }} />
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
                <MenuItem onClick={logoutHandler} disabled={isLoggingOut}>
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
