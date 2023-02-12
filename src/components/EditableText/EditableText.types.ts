import { SxProps, TypographyProps } from '@mui/material';
import Joi from 'joi';
import { ElementType } from 'react';
import { InputProps } from '../ControlledInput/ControlledInput.types';
import { EditWrapperProps } from '../EditWrapper/EditWrapper.types';

export type EditableTextProps<T extends ElementType = 'span'> = {
    initialText: string;
    editWrapperProps?: Omit<EditWrapperProps, 'children'>;
    typographyProps?: Omit<TypographyProps<T>, 'children' | 'component'> & { component?: T };
    inputProps: Omit<InputProps, 'value' | 'control'>;
    inputContainerSx?: SxProps;
    isSaving?: boolean;
    validationSchema: Joi.Schema;
    onSave: (inputText: string) => MaybePromise<void>;
};
