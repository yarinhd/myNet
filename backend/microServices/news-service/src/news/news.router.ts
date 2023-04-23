import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { canCreateNews, canGetNews } from './news.validator';
import NewsController from './news.controller';

const NewsRouter: Router = Router();

NewsRouter.get(
    '/getNews',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetNews),
    wrapController(NewsController.getNews)
);

NewsRouter.post(
    '/createNews',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateNews),
    wrapController(NewsController.createNews)
);

export default NewsRouter;
