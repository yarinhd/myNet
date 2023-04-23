import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import MyWikiController from './myWiki.controller';
import { canCreateMyWiki, canUpdateMyWiki, canGetMyWiki, canDeleteMyWiki } from './myWiki.validator';
import { Permission } from '../../common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';

const MyWikiRouter: Router = Router();

MyWikiRouter.get(
    '/getMyWiki',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetMyWiki),
    wrapController(MyWikiController.getMyWiki)
);

MyWikiRouter.post(
    '/createMyWiki',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateMyWiki),
    wrapController(MyWikiController.createMyWiki)
);

MyWikiRouter.put(
    '/updateMyWiki/:myWikiId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdateMyWiki),
    wrapController(MyWikiController.updateMyWiki)
);

MyWikiRouter.delete(
    '/deleteMyWiki/:myWikiId',
    verifyToken,
    validateUserAndPermission([Permission.DIRECTOR]),
    validateRequest(canDeleteMyWiki),
    wrapController(MyWikiController.deleteMyWiki)
);

export default MyWikiRouter;
