import { CarouselProps as ResponsiveCarouselProps } from 'react-responsive-carousel';

export type CarouselProps = Omit<Partial<ResponsiveCarouselProps>, 'children'> &
    Pick<ResponsiveCarouselProps, 'children'>;
