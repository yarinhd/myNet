import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { formidableMiddleware } from 'shared-atom/utils/validators/formidable';
import { IArticle } from 'common-atom/interfaces/article.interface';
import { config } from 'shared-atom/config';
import { canCreateArticle, canUpdateArticle, canGetArticles } from './article.validator';
import ArticleController from './article.controller';

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
    formidableMiddleware<IArticle>(config.formidable.propertyConfigs.article),
    validateRequest(canCreateArticle),
    wrapController(ArticleController.createArticle)
);

ArticleRouter.put(
    '/updateArticle/:articleId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IArticle>(config.formidable.propertyConfigs.article),
    validateRequest(canUpdateArticle),
    wrapController(ArticleController.updateArticle)
);

export default ArticleRouter;
