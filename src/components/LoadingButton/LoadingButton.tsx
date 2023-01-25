import { Button, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { LoadingButtonProps } from './LoadingButton.types';

function LoadingButton(props: LoadingButtonProps) {
    const { loading, disabled, children, sx, ...btnProps } = props;
    const [btnHeight, setBtnHeight] = useState(38);
    const [btnWidth, setBtnWidth] = useState(0);
    const [isMeasuresSaved, setIsMeasuresSaved] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const height = isMeasuresSaved ? btnHeight : undefined;
    const width = isMeasuresSaved ? btnWidth : undefined;

    useEffect(() => {
        if (btnRef.current !== null && !isMeasuresSaved) {
            setBtnHeight(btnRef.current.offsetHeight);
            setBtnWidth(btnRef.current.offsetWidth);
            setIsMeasuresSaved(true);
        }
    }, [isMeasuresSaved]);

    return (
        <Button ref={btnRef} disabled={disabled || loading} sx={{ height, width, ...sx }} {...btnProps}>
            {loading ? <CircularProgress sx={{ color: 'darkgray' }} size={btnHeight * 0.6} /> : children}
        </Button>
    );
}

export default LoadingButton;
