import { Router } from 'express';
import { validateRequest, validateRequestByPermission } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import UserController from './user.controller';
import {
    canGetLastWatched,
    canPatchChapter,
    canPatchMedia,
    canCreateUser,
    canUpdateUser,
    canGetUsers,
    canPatchRelevantArea,
    canGetAmountOfUsers,
} from './user.validator';
import { Permission } from '../../common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';

const UserRouter: Router = Router();

UserRouter.get(
    '/getUsers',
    verifyToken,
    validateUserAndPermission([Permission.DIRECTOR, Permission.ORGANIZER]),
    validateRequest(canGetUsers),
    wrapController(UserController.getUsers)
);

UserRouter.get(
    '/getLastWatched',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetLastWatched),
    wrapController(UserController.getLastWatched)
);

UserRouter.get(
    '/getAmountOfUsers',
    verifyToken,
    validateUserAndPermission([Permission.ORGANIZER, Permission.DIRECTOR]),
    validateRequest(canGetAmountOfUsers),
    wrapController(UserController.getAmountOfUsers)
);

UserRouter.post('/createUser', validateRequest(canCreateUser), wrapController(UserController.createUser));

UserRouter.put(
    '/updateUser/:userId',
    verifyToken,
    validateUserAndPermission(),
    validateRequestByPermission(canUpdateUser),
    wrapController(UserController.updateUser)
);

UserRouter.patch(
    '/patchRelevantArea',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canPatchRelevantArea),
    wrapController(UserController.patchRelevantArea)
);

UserRouter.patch(
    '/patchChapter/:chapterId',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canPatchChapter),
    wrapController(UserController.patchChapter)
);

UserRouter.patch(
    '/patchMedia/:mediaId',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canPatchMedia),
    wrapController(UserController.patchMedia)
);

export default UserRouter;
