import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { IUnit } from 'common-atom/interfaces/unit.interface';
import { formidableMiddleware } from 'shared-atom/utils/validators/formidable';
import { config } from 'shared-atom/config';
import { canCreateUnit, canUpdateUnit } from './unit.validator';
import UnitController from './unit.controller';

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
    formidableMiddleware<IUnit>(config.formidable.propertyConfigs.unit),
    validateRequest(canCreateUnit),
    wrapController(UnitController.createUnit)
);

UnitRouter.put(
    '/updateUnit/:unitId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IUnit>(config.formidable.propertyConfigs.unit),
    validateRequest(canUpdateUnit),
    wrapController(UnitController.updateUnit)
);

export default UnitRouter;
