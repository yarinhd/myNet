import { Router } from 'express';
import { Permission } from 'common-atom/enums/Permission';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import ChapterController from './chapter.controller';
import { canCreateChapter, canUpdateChapter } from './chapter.validator';

const ChapterRouter: Router = Router();

ChapterRouter.post(
    '/createChapter/:contentType',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateChapter),
    wrapController(ChapterController.createChapter)
);

ChapterRouter.put(
    '/updateChapter/:chapterId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdateChapter),
    wrapController(ChapterController.updateChapter)
);

export default ChapterRouter;
