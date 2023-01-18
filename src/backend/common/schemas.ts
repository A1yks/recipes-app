import Joi from 'joi';

export const idSchema = Joi.number().min(1).required();

export const idArrayStringPattern = Joi.string().pattern(/(\d+,)*?(\d+)$/);
