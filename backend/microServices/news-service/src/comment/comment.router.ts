import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import CommentController from './comment.controller';
import { canCreateComment, canDeleteComment } from './comment.validator';

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
