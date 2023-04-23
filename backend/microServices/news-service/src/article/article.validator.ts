import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiBlob, joiEnum, joiMongoId } from 'shared-atom/utils/joi/joi.types';
import { Category } from 'common-atom/enums/Category';

const Joi = JoiBase.extend(<any>joiDate);

export const canGetArticles = Joi.object({
    query: {
        category: joiEnum(Category),
    },
    body: {},
    params: {},
});

export const canCreateArticle = Joi.object({
    query: {},
    body: Joi.object({
        title: Joi.string().required(),
        writtenBy: Joi.string().required(),
        category: joiEnum(Category).required(),
        bestSoldier: Joi.object({
            name: Joi.string().required(),
            age: Joi.number().integer().required(),
            unit: Joi.string().required(),
            city: Joi.string().required(),
            description: Joi.string().required(),
            image: joiBlob.required(),
        }),
        thumbNail: joiBlob.required(),
        pdf: joiBlob.required(),
    }).required(),
    params: {},
});

export const canUpdateArticle = Joi.object({
    query: {},
    body: Joi.object({
        title: Joi.string(),
        writtenBy: Joi.string(),
        category: joiEnum(Category),
        bestSoldier: Joi.object({
            name: Joi.string().required(),
            age: Joi.number().integer().required(),
            unit: Joi.string().required(),
            city: Joi.string().required(),
            description: Joi.string().required(),
            image: joiBlob.required(),
        }),
        thumbNail: joiBlob,
        pdf: joiBlob,
    })
        .min(1)
        .required(),
    params: Joi.object({
        articleId: joiMongoId().required(),
    }).required(),
});
