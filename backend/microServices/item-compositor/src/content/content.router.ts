import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import ContentController from './content.controller';
import { canGetContentById } from './content.validator';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';

const ContentRouter: Router = Router();
ContentRouter.get(
    '/getContentById',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetContentById),
    wrapController(ContentController.getContentById)
);

export default ContentRouter;
