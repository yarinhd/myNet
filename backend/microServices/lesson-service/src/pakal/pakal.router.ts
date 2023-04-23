import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { IPakal } from 'common-atom/interfaces/pakal.interface';
import { formidableMiddleware } from 'shared-atom/utils/validators/formidable';
import { config } from 'shared-atom/config';
import PakalController from './pakal.controller';
import { canCreatePakal, canUpdatePakal } from './pakal.validator';

const PakalRouter: Router = Router();

PakalRouter.post(
    '/createPakal',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IPakal>(config.formidable.propertyConfigs.pakal, true),
    validateRequest(canCreatePakal),
    wrapController(PakalController.createPakal)
);

PakalRouter.put(
    '/updatePakal/:pakalId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IPakal>(config.formidable.propertyConfigs.pakal),
    validateRequest(canUpdatePakal),
    wrapController(PakalController.updatePakal)
);

export default PakalRouter;
