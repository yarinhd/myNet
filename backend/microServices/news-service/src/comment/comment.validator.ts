import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiMongoId } from 'shared-atom/utils/joi/joi.types';
import { ArticleManager } from '../article/article.manager';

const Joi = JoiBase.extend(<any>joiDate);

export const canCreateComment = Joi.object({
    query: {},
    body: Joi.object({
        comment: Joi.string().required(),
    }).required(),
    params: Joi.object({
        articleId: joiMongoId(ArticleManager.getArticleById).required(),
    }).required(),
});

export const canDeleteComment = Joi.object({
    query: {},
    body: {},
    params: Joi.object({
        articleId: joiMongoId(ArticleManager.getArticleById).required(),
        commentId: joiMongoId().required(),
    }).required(),
});
