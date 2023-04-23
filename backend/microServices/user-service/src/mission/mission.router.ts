import { Router } from 'express';
import { validateRequest, validateRequestByPermission } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import MissionController from './mission.controller';
import { canCreateMission, canGetMissions, canUpdateMission, canDeleteMission } from './mission.validator';
import { Permission } from '../../common/enums/Permission';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';

const MissionRouter: Router = Router();

MissionRouter.get(
    '/getMissions',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canGetMissions),
    wrapController(MissionController.getMissions)
);

MissionRouter.post(
    '/createMission',
    verifyToken,
    validateUserAndPermission([Permission.DIRECTOR]),
    validateRequest(canCreateMission),
    wrapController(MissionController.createMission)
);

MissionRouter.put(
    '/updateMission/:missionId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequestByPermission(canUpdateMission),
    wrapController(MissionController.updateMission)
);

MissionRouter.delete(
    '/deleteMission/:missionId',
    verifyToken,
    validateUserAndPermission([Permission.DIRECTOR]),
    validateRequest(canDeleteMission),
    wrapController(MissionController.deleteMission)
);

export default MissionRouter;
