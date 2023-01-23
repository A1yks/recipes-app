import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';
import { InputProps } from './ControlledInput.types';
import styles from './ControlledInput.module.scss';

function ControlledInput(props: InputProps) {
    const { control, name, rules, defaultValue, shouldUnregister, ...restProps } = props;
    const {
        field,
        fieldState: { error, invalid },
    } = useController({ control, name, rules, defaultValue, shouldUnregister });

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        field.onChange(e);
        props.onChange?.(e);
    }

    function blurHandler(e: React.FocusEvent<HTMLInputElement>) {
        field.onBlur();
        props.onBlur?.(e);
    }

    return (
        <TextField
            {...restProps}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={props.value}
            name={field.name}
            inputRef={field.ref}
            error={invalid}
            label={error?.message}
            InputLabelProps={{ className: styles.label }}
        />
    );
}

export default ControlledInput;
