import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import NewsController from './news.controller';
import { canCreateNews, canGetNews } from './news.validator';
import { Permission } from '../../common/enums/Permission';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { verifyToken } from '../../shared/utils/jwt/jwt';

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
