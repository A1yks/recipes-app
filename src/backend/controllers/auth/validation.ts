import Joi from 'joi';
import { LoginReq, RegisterReq } from './types';

export const loginSchema = Joi.object<LoginReq>().keys({
    login: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(6).max(72).required(),
});

export const registrationSchema = loginSchema.append<RegisterReq>({
    name: Joi.string().min(2).max(30).required(),
    surname: Joi.string().min(2).max(30).required(),
});
