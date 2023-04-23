import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import ArticleController from './article.controller';
import { canCreateArticle, canUpdateArticle, canGetArticles } from './article.validator';
import { Permission } from '../../common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { multerMiddleware } from '../../shared/utils/validators/multer';
import { IArticle } from '../../common/interfaces/article.interface';
import { config } from '../../shared/config';

const ArticleRouter: Router = Router();

ArticleRouter.get(
    '/getArticles',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetArticles),
    wrapController(ArticleController.getArticles)
);

ArticleRouter.post(
    '/createArticle',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateArticle),
    multerMiddleware<IArticle>(config.multer.propertyConfigs.article),
    wrapController(ArticleController.createArticle)
);

ArticleRouter.put(
    '/updateArticle/:articleId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdateArticle),
    multerMiddleware<IArticle>(config.multer.propertyConfigs.article),
    wrapController(ArticleController.updateArticle)
);

export default ArticleRouter;
