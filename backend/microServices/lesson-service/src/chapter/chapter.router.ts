import { Router } from 'express';
import { Permission } from '../../common/enums/Permission';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
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
