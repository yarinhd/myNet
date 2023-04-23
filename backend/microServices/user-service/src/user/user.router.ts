import { Router } from 'express';
import { validateRequest, validateRequestByPermission } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import {
    canGetLastWatched,
    canPatchChapter,
    canPatchMedia,
    canCreateUser,
    canGetUsers,
    canGetAmountOfUsers,
    canGetUserById,
    canUpdateUserPublic,
} from './user.validator';
import UserController from './user.controller';

const UserRouter: Router = Router();

UserRouter.get('/getUserById', validateRequest(canGetUserById), wrapController(UserController.getUserById));

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

UserRouter.post('/createUser', verifyToken, validateRequest(canCreateUser), wrapController(UserController.createUser));

UserRouter.put(
    '/updateUser/:userId',
    verifyToken,
    validateUserAndPermission(),
    validateRequestByPermission(canUpdateUserPublic),
    wrapController(UserController.updateUser)
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
