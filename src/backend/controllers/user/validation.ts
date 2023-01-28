import Joi from 'joi';
import { loginFieldSchema, nameFieldSchema, passwordFieldSchema } from '../auth/validation';
import { DeleteUserReq, EditUserReq, GetUserRecipesReq } from './types';

export const getUserRecipesSchema = Joi.object<GetUserRecipesReq>().keys({
    page: Joi.number().min(1),
});

export const editAccountDataSchema = Joi.object<EditUserReq>()
    .keys({
        login: loginFieldSchema,
        password: passwordFieldSchema,
        name: nameFieldSchema,
        surname: nameFieldSchema,
    })
    .or('login', 'password', 'name', 'surname');

export const deleteAccountSchema = Joi.object<DeleteUserReq>().keys({
    password: passwordFieldSchema.required(),
});
