import Header from 'src/features/Header';
import { PageLayoutProps } from '../PageLayout.types';

// TODO add footer
function PageLayout(props: PageLayoutProps) {
    return (
        <>
            <Header />
            {props.children}
        </>
    );
}

export default PageLayout;
