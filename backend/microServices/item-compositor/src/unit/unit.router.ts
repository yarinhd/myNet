import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import UnitController from './unit.controller';
import { canCreateUnit, canUpdateUnit } from './unit.validator';
import { Permission } from '../../common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { IUnit } from '../../common/interfaces/unit.interface';
import { multerMiddleware } from '../../shared/utils/validators/multer';
import { config } from '../../shared/config';

const UnitRouter: Router = Router();

UnitRouter.get(
    '/getUnits',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    wrapController(UnitController.getUnits)
);

UnitRouter.post(
    '/createUnit',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateUnit),
    multerMiddleware<IUnit>(config.multer.propertyConfigs.unit),
    wrapController(UnitController.createUnit)
);

UnitRouter.put(
    '/updateUnit/:unitId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdateUnit),
    multerMiddleware<IUnit>(config.multer.propertyConfigs.unit),
    wrapController(UnitController.updateUnit)
);

export default UnitRouter;
