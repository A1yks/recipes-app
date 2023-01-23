import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

type NavigationMenu = {
    title: string;
    href: string;
    icon: OverridableComponent<SvgIconTypeMap>;
};

export const navigationMenu: Readonly<NavigationMenu[]> = [
    {
        title: 'Home',
        href: '/',
        icon: HomeIcon,
    },
    {
        title: 'Recipes',
        href: '/recipes',
        icon: FastfoodIcon,
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: CategoryIcon,
    },
    {
        title: 'About',
        href: '/about',
        icon: InfoIcon,
    },
];
