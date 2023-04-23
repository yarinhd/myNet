import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import AreaController from './area.controller';
import { canCreateArea, canUpdateArea } from './area.validator';
import { Permission } from '../../common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { IArea } from '../../common/interfaces/area.interface';
import { multerMiddleware } from '../../shared/utils/validators/multer';
import { config } from '../../shared/config';

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
    validateRequest(canCreateArea),
    multerMiddleware<IArea>(config.multer.propertyConfigs.area),
    wrapController(AreaController.createArea)
);

AreaRouter.put(
    '/updateArea/:areaId',
    verifyToken,
    validateUserAndPermission([Permission.DIRECTOR]),
    validateRequest(canUpdateArea),
    multerMiddleware<IArea>(config.multer.propertyConfigs.area),
    wrapController(AreaController.updateArea)
);

export default AreaRouter;
