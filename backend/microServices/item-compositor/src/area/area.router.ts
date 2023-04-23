import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import AreaController from './area.controller';
import { canCreateArea, canUpdateArea } from './area.validator';
import { Permission } from 'common-atom/enums/Permission';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { IArea } from 'common-atom/interfaces/area.interface';
import { formidableMiddleware } from 'shared-atom/utils/validators/formidable';
import { config } from 'shared-atom/config';

const AreaRouter: Router = Router();

AreaRouter.get(
    '/getAreas',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    wrapController(AreaController.getAreas)
);

AreaRouter.post(
    '/createArea',
    verifyToken,
    validateUserAndPermission([Permission.DIRECTOR]),
    formidableMiddleware<IArea>(config.formidable.propertyConfigs.area),
    validateRequest(canCreateArea),
    wrapController(AreaController.createArea)
);

AreaRouter.put(
    '/updateArea/:areaId',
    verifyToken,
    validateUserAndPermission([Permission.DIRECTOR]),
    formidableMiddleware<IArea>(config.formidable.propertyConfigs.area),
    validateRequest(canUpdateArea),
    wrapController(AreaController.updateArea)
);

export default AreaRouter;
