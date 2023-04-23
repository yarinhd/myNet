import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import TestController from './test.controller';
import { canCreateTest, canUpdateTest } from './test.validator';

const TestRouter: Router = Router();

TestRouter.post(
    '/createTest',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateTest),
    wrapController(TestController.createTest)
);

TestRouter.put(
    '/updateTest/:testId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdateTest),
    wrapController(TestController.updateTest)
);

export default TestRouter;
