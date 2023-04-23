import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import TestByUserController from './testByUser.controller';
import { canGetEmployeesTests, canCreateTestByUser } from './testByUser.validator';
import { Permission } from '../../common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';

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
