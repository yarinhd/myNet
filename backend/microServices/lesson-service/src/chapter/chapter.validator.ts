import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { ContentType } from 'common-atom/enums/ContentType';
import { joiMongoId } from 'shared-atom/utils/joi/joi.types';

const Joi = JoiBase.extend(<any>joiDate);

//  RPC routes
export const canGetChapterById = Joi.object({
    chapterId: joiMongoId().required(),
});

//  public routes
export const canCreateChapter = Joi.object({
    query: {},
    body: Joi.object({
        title: Joi.string().required(),
        page: Joi.number().integer().required(),
        description: Joi.string(),
    }).required(),
    params: Joi.object({
        contentType: Joi.string().valid(ContentType.LESSON, ContentType.PAKAL).required(),
    }).required(),
});

export const canUpdateChapter = Joi.object({
    query: {},
    body: Joi.object({
        title: Joi.string(),
        page: Joi.number().integer(),
        description: Joi.string(),
    })
        .min(1)
        .required(),
    params: Joi.object({
        chapterId: joiMongoId().required(),
    }).required(),
});
