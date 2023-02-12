import React, { useEffect, useState } from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { CarouselProps } from './Carousel.types';

function Carousel(props: CarouselProps) {
    const [isClientSide, setIsClientSide] = useState(false);

    useEffect(() => {
        if (!isClientSide) {
            setIsClientSide(true);
        }
    }, [isClientSide]);

    if (!isClientSide) {
        return <>{props.children}</>;
    }

    return (
        <ResponsiveCarousel showThumbs={false} swipeable emulateTouch {...props}>
            {props.children}
        </ResponsiveCarousel>
    );
}

export default Carousel;
