import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { IInfographic } from 'common-atom/interfaces/infographic.interface';
import { formidableMiddleware } from 'shared-atom/utils/validators/formidable';
import { config } from 'shared-atom/config';
import InfographicController from './infographic.controller';
import { canCreateInfographic, canUpdateInfographic } from './infographic.validator';

const InfographicRouter: Router = Router();

InfographicRouter.post(
    '/createInfographic',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IInfographic>(config.formidable.propertyConfigs.infographic, true),
    validateRequest(canCreateInfographic),
    wrapController(InfographicController.createInfographic)
);

InfographicRouter.put(
    '/updateInfographic/:infographicId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IInfographic>(config.formidable.propertyConfigs.infographic),
    validateRequest(canUpdateInfographic),
    wrapController(InfographicController.updateInfographic)
);

export default InfographicRouter;
