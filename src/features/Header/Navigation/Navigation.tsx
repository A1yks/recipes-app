import { Grid, GridProps, Link } from '@mui/material';
import { navigationMenu } from 'src/constants/navigation';
import styles from './Navigation.module.scss';

function Navigation(props: GridProps<'ul'>) {
    return (
        <Grid item container component="ul" display="inline-flex" width="auto" flexWrap="nowrap" {...props}>
            {navigationMenu.map(({ title, href }, i) => (
                <Grid key={title} item component="li" ml={i > 0 ? 3 : undefined}>
                    <Link href={href} className={styles.link}>
                        {title}
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}

export default Navigation;
