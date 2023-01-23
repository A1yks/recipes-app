import { IconButton, List, ListItemButton, Drawer, Link, ListItemIcon, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMobileMenu from './hooks/useMobileMenu';
import { navigationMenu } from 'src/constants/navigation';

function MobileMenu(props: Props.WithSx) {
    const { isDrawerOpened, openDrawerHandler, closeDrawerHandler, linkClickHandler } = useMobileMenu();
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <IconButton sx={props.sx} onClick={openDrawerHandler}>
                <MenuIcon fontSize={matchesSm ? 'medium' : 'large'} />
            </IconButton>
            <Drawer anchor="left" open={isDrawerOpened} onClose={closeDrawerHandler}>
                <List>
                    {navigationMenu.map(({ title, href, icon: Icon }) => (
                        <ListItemButton key={title} onClick={linkClickHandler(href)}>
                            <ListItemIcon>
                                <Icon fontSize="medium" />
                            </ListItemIcon>
                            {title}
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default MobileMenu;
