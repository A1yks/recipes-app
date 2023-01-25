import { EditUserReq } from '@backend/controllers/user/types';
import { editAccountDataSchema } from '@backend/controllers/user/validation';
import { useSnackbar } from 'notistack';
import useUserDataValidation from 'src/hooks/useUserDataValidation';
import { useEditAccountDataMutation } from 'src/services/api';
import { useAppSelector } from 'src/store/hooks';
import useErrorsHandler from 'src/utils/errorsHandler';

function useFieldsSettings() {
    const user = useAppSelector((state) => state.auth.user);
    const { enqueueSnackbar } = useSnackbar();
    const [editAccountDataMutation, { isLoading: isSaving }] = useEditAccountDataMutation();

    const editAccountData = useErrorsHandler(async () => {
        const body = getReqBody();

        await editAccountDataMutation(body).unwrap();
        deletePassword();
        enqueueSnackbar('Data was successfully updated', { variant: 'success' });
    });
    const { control, formState, changeHandler, submitHandler, setFormState } = useUserDataValidation(
        editAccountData,
        editAccountDataSchema,
        user !== null
            ? {
                  login: user.login,
                  password: '',
                  name: user.name,
                  surname: user.surname,
              }
            : undefined
    );

    function getReqBody() {
        const body: EditUserReq = {};

        for (const [key, value] of Object.entries(formState)) {
            if (key === 'password') {
                if (value !== '') body.password = value;
            } else if (value.trim() !== '') {
                body[key as keyof typeof body] = value.trim();
            }
        }

        return body;
    }

    function deletePassword() {
        setFormState((state) => ({ ...state, password: '' }));
    }

    return { control, formState, isSaving, changeHandler, submitHandler };
}

export default useFieldsSettings;
