import Joi from 'joi';
import { LoginReq, RegisterReq } from './types';

export const loginFieldSchema = Joi.string().min(4).max(16);
export const passwordFieldSchema = Joi.string().min(6).max(72);
export const nameFieldSchema = Joi.string().min(2).max(30);

export const loginSchema = Joi.object<LoginReq>().keys({
    login: loginFieldSchema.required(),
    password: passwordFieldSchema.required(),
});

export const registrationSchema = loginSchema.append<RegisterReq>({
    name: nameFieldSchema.required(),
    surname: nameFieldSchema.required(),
});
