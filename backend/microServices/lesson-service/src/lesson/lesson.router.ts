import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { ILesson } from 'common-atom/interfaces/lesson.interface';
import { config } from 'shared-atom/config';
import { formidableMiddleware } from 'shared-atom/utils/validators/formidable';
import LessonController from './lesson.controller';
import { canCreateLesson, canUpdateLesson } from './lesson.validator';

const LessonRouter: Router = Router();

LessonRouter.post(
    '/createLesson',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<ILesson>(config.formidable.propertyConfigs.lesson, true),
    validateRequest(canCreateLesson),
    wrapController(LessonController.createLesson)
);

LessonRouter.put(
    '/updateLesson/:lessonId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<ILesson>(config.formidable.propertyConfigs.lesson),
    validateRequest(canUpdateLesson),
    wrapController(LessonController.updateLesson)
);

export default LessonRouter;
