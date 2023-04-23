import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiMongoId } from 'shared-atom/utils/joi/joi.types';

const Joi = JoiBase.extend(<any>joiDate);

export const canGetMyWiki = Joi.object({
    query: Joi.object({
        search: Joi.string(),
        skip: Joi.number().integer().min(0).required(),
        limit: Joi.number().integer().min(1).max(25).required(),
    }).required(),
    body: {},
    params: {},
});

export const canCreateMyWiki = Joi.object({
    query: {},
    body: Joi.object({
        word: Joi.string().required(),
        defenition: Joi.string().required(),
    }).required(),
    params: {},
});

export const canUpdateMyWiki = Joi.object({
    query: {},
    body: Joi.object({
        word: Joi.string(),
        defenition: Joi.string(),
    })
        .min(1)
        .required(),
    params: Joi.object({
        myWikiId: joiMongoId().required(),
    }).required(),
});

export const canDeleteMyWiki = Joi.object({
    query: {},
    body: {},
    params: Joi.object({
        myWikiId: joiMongoId().required(),
    }).required(),
});
