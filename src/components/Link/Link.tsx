import NextLink, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    return <NextLink ref={ref} {...props} />;
});

Link.displayName = 'Link';

export default Link;
