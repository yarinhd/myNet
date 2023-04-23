import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import PakalController from './pakal.controller';
import { canCreatePakal, canUpdatePakal } from './pakal.validator';
import { Permission } from '../../common/enums/Permission';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { verifyToken } from '../../shared/utils/jwt/jwt';

const PakalRouter: Router = Router();

PakalRouter.post(
    '/createPakal',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreatePakal),
    wrapController(PakalController.createPakal)
);

PakalRouter.put(
    '/updatePakal/:pakalId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdatePakal),
    wrapController(PakalController.updatePakal)
);

export default PakalRouter;
