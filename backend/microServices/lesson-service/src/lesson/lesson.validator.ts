import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiContentCreator, joiMongoId, joiMongoIdArray, joiPdfURL } from '../../shared/utils/joi/joi.types';
import { ChapterManager } from '../chapter/chapter.manager';
import { ItemRPCService } from '../../shared/utils/rpc/services/item.RPCservice';
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
        pdfURL: joiPdfURL.required(),
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
        pdfURL: joiPdfURL,
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
