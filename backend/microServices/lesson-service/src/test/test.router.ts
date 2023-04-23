import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import TestController from './test.controller';
import { canCreateTest, canUpdateTest } from './test.validator';
import { Permission } from '../../common/enums/Permission';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { verifyToken } from '../../shared/utils/jwt/jwt';

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
