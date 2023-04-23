import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import ContentController from './content.controller';
import { canGetContentById } from './content.validator';

const ContentRouter: Router = Router();
ContentRouter.get(
    '/getContentById',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetContentById),
    wrapController(ContentController.getContentById)
);

export default ContentRouter;
