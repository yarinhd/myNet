import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import InfographicController from './infographic.controller';
import { canCreateInfographic, canUpdateInfographic } from './infographic.validator';
import { Permission } from '../../common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { IInfographic } from '../../common/interfaces/infographic.interface';
import { multerMiddleware } from '../../shared/utils/validators/multer';
import { config } from '../../shared/config';

const InfographicRouter: Router = Router();

InfographicRouter.post(
    '/createInfographic',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateInfographic),
    multerMiddleware<IInfographic>(config.multer.propertyConfigs.infographic),
    wrapController(InfographicController.createInfographic)
);

InfographicRouter.put(
    '/updateInfographic/:infographicId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdateInfographic),
    multerMiddleware<IInfographic>(config.multer.propertyConfigs.infographic),
    wrapController(InfographicController.updateInfographic)
);

export default InfographicRouter;
