import { FullHeightLayoutProps } from './FullHeightContainer.types';
import { Container } from '@mui/material';

function FullHeightContainer(props: FullHeightLayoutProps) {
    const { sx, children, ...restProps } = props;

    return (
        <Container sx={{ minHeight: '100vh', height: 0, ...sx }} {...restProps}>
            {children}
        </Container>
    );
}

export default FullHeightContainer;
