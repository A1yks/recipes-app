import { useCallback, useEffect, useState } from 'react';
import useRecipe from 'src/hooks/useRecipe';

function useGalleryCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { photos } = useRecipe();

    useEffect(() => {
        if (currentSlide >= photos.length) {
            const slideIndex = photos.length - 1 < 0 ? 0 : photos.length - 1;

            setCurrentSlide(slideIndex);
        }
    }, [currentSlide, photos.length]);

    const slideChangeHandler = useCallback((index: number) => {
        setCurrentSlide(index);
    }, []);

    return { currentSlide, slideChangeHandler };
}

export default useGalleryCarousel;
