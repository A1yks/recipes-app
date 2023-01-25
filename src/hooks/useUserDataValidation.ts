import { registrationSchema } from '@backend/controllers/auth/validation';
import Joi from 'joi';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import joiResolver from 'src/utils/joiResolver';

export type FormState = {
    login: string;
    password: string;
    name: string;
    surname: string;
};

type CallbackType = (formState: FormState) => MaybePromise<void>;

function useUserDataValidation(
    submitCallback: CallbackType,
    validationSchema: Joi.ObjectSchema = registrationSchema,
    defaultFormState?: FormState
) {
    const { control, handleSubmit } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(validationSchema),
    });

    const [formState, setFormState] = useState<FormState>(
        defaultFormState !== undefined
            ? { ...defaultFormState }
            : {
                  login: '',
                  password: '',
                  name: '',
                  surname: '',
              }
    );

    function changeHandler(field: keyof FormState) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormState((prev) => ({ ...prev, [field]: e.target.value }));
        };
    }

    const submitHandler = handleSubmit(() => submitCallback(formState));

    return { control, formState, changeHandler, submitHandler, setFormState };
}

export default useUserDataValidation;
