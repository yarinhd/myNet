import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { canCreateMyWiki, canUpdateMyWiki, canGetMyWiki, canDeleteMyWiki } from './myWiki.validator';
import MyWikiController from './myWiki.controller';

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
