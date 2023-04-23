import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { canGetEmployeesTests, canCreateTestByUser } from './testByUser.validator';
import TestByUserController from './testByUser.controller';

const TestByUserRouter: Router = Router();

TestByUserRouter.get(
    '/getEmployeesTests',
    verifyToken,
    validateUserAndPermission([Permission.COMMANDER]),
    validateRequest(canGetEmployeesTests),
    wrapController(TestByUserController.getEmployeesTests)
);

TestByUserRouter.post(
    '/finishTest',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canCreateTestByUser),
    wrapController(TestByUserController.createTestByUser)
);

export default TestByUserRouter;
