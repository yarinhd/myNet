import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiBlob, joiContentCreator, joiMongoId, joiMongoIdArray } from 'shared-atom/utils/joi/joi.types';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { ChapterManager } from '../chapter/chapter.manager';
import { TestManager } from '../test/test.manager';

const Joi = JoiBase.extend(<any>joiDate);

//  RPC routes
export const canGetLessonById = Joi.object({
    lessonId: joiMongoId().required(),
});

//  public routes
export const canCreateLesson = joiContentCreator(
    Joi.object({
        goal: Joi.string().required(),
        experience: Joi.string().required(),
        pdf: joiBlob.required(),
        chapters: joiMongoIdArray(ChapterManager.getChapterById).min(1).required(),
        preKnowledge: joiMongoIdArray(ItemRPCService.getItemById),
        test: joiMongoId(TestManager.getTestById),
    })
);

export const canUpdateLesson = Joi.object({
    query: {},
    body: Joi.object({
        goal: Joi.string(),
        experience: Joi.string(),
        pdf: joiBlob,
        chapters: joiMongoIdArray(ChapterManager.getChapterById).min(1),
        preKnowledge: joiMongoIdArray(ItemRPCService.getItemById),
        test: joiMongoId(TestManager.getTestById),
    })
        .min(1)
        .required(),
    params: Joi.object({
        lessonId: joiMongoId().required(),
    }).required(),
});
