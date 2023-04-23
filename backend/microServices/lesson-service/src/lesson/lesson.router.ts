import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import LessonController from './lesson.controller';
import { canCreateLesson, canUpdateLesson } from './lesson.validator';
import { Permission } from '../../shared/common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';

const LessonRouter: Router = Router();

LessonRouter.post(
    '/createLesson',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateLesson),
    wrapController(LessonController.createLesson)
);

LessonRouter.put(
    '/updateLesson/:lessonId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdateLesson),
    wrapController(LessonController.updateLesson)
);

export default LessonRouter;
