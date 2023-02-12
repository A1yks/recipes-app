import React, { ElementType, useState } from 'react';
import { useForm } from 'react-hook-form';
import useErrorsHandler from 'src/utils/errorsHandler';
import joiResolver from 'src/utils/joiResolver';
import { EditableTextProps } from '../EditableText.types';

function useEditableText<T extends ElementType>(props: EditableTextProps<T>) {
    const { initialText } = props;
    const [edit, setEdit] = useState(false);
    const [inputText, setInputText] = useState(initialText);
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        resolver: joiResolver(props.validationSchema),
    });

    const editIconClickHandler = () => setEdit(true);

    const save = useErrorsHandler(async () => {
        if (initialText !== inputText) {
            await props.onSave(inputText);
        }

        setEdit(false);
    });

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        props.inputProps.onChange?.(e);
        setInputText(e.target.value);
    }

    function inputFocusHandler(e: React.FocusEvent<HTMLInputElement>) {
        e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
    }

    function cancelHandler() {
        setInputText(initialText);
        setEdit(false);
    }

    const saveHandler = handleSubmit(save);

    return {
        control,
        edit,
        inputText,
        editIconClickHandler,
        inputChangeHandler,
        inputFocusHandler,
        saveHandler,
        cancelHandler,
    };
}

export default useEditableText;
