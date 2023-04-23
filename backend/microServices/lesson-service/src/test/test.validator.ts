import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiMongoId } from '../../shared/utils/joi/joi.types';

const Joi = JoiBase.extend(<any>joiDate);

export const canCreateTest = Joi.object({
    query: {},
    body: Joi.object({
        questions: Joi.array()
            .items(
                Joi.object({
                    question: Joi.string().required(),
                    options: Joi.array().items(Joi.string()).min(1).required(),
                    correctAnswer: Joi.string().valid(Joi.in('options')).required(),
                })
            )
            .min(1)
            .required(),
    }).required(),
    params: {},
});

export const canUpdateTest = Joi.object({
    query: {},
    body: Joi.object({
        questions: Joi.array()
            .items(
                Joi.object({
                    question: Joi.string().required(),
                    options: Joi.array().items(Joi.string()).min(1).required(),
                    correctAnswer: Joi.string().valid(Joi.in('options')).required(),
                })
            )
            .min(1),
    })
        .min(1)
        .required(),
    params: Joi.object({
        testId: joiMongoId().required(),
    }).required(),
});
