import {
    Link,
    Pagination as MuiPagination,
    PaginationItem,
    PaginationRenderItemParams,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { PaginationProps } from './Pagination.types';

function Paginattion(props: PaginationProps) {
    const { hrefPattern, queries = true, ...restProps } = props;
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));

    const renderItem =
        hrefPattern !== undefined
            ? (item: PaginationRenderItemParams) => {
                  const query = !queries || item.page === 1 ? '' : `?page=${item.page}`;
                  const href = `${hrefPattern}${query}`;

                  return (
                      <Link href={href}>
                          <PaginationItem {...item} />
                      </Link>
                  );
              }
            : undefined;

    return (
        <MuiPagination size={matchesSm ? 'medium' : 'small'} color="primary" renderItem={renderItem} {...restProps} />
    );
}

export default Paginattion;
