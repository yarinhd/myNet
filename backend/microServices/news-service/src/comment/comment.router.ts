import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import CommentController from './comment.controller';
import { canCreateComment, canDeleteComment } from './comment.validator';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';

const CommentRouter: Router = Router();

CommentRouter.post(
    '/createComment/:articleId',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canCreateComment),
    wrapController(CommentController.createComment)
);

CommentRouter.delete(
    '/deleteComment/:articleId/:commentId',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canDeleteComment),
    wrapController(CommentController.deleteComment)
);

export default CommentRouter;
