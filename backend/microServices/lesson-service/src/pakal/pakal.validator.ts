import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiContentCreator, joiMongoId, joiMongoIdArray, joiBlob } from 'shared-atom/utils/joi/joi.types';
import { ChapterManager } from '../chapter/chapter.manager';
import { TestManager } from '../test/test.manager';

const Joi = JoiBase.extend(<any>joiDate);

// RPC routes
export const canGetPakalById = Joi.object({
    pakalId: joiMongoId().required(),
});

// public routes
export const canCreatePakal = joiContentCreator(
    Joi.object({
        pdf: joiBlob.required(),
        chapters: joiMongoIdArray(ChapterManager.getChapterById).min(1).required(),
        test: joiMongoId(TestManager.getTestById),
    })
);

export const canUpdatePakal = Joi.object({
    query: {},
    body: Joi.object({
        pdf: joiBlob,
        chapters: joiMongoIdArray(ChapterManager.getChapterById).min(1),
        test: joiMongoId(TestManager.getTestById),
    })
        .min(1)
        .required(),
    params: Joi.object({
        pakalId: joiMongoId().required(),
    }).required(),
});
