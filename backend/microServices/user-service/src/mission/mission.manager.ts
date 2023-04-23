/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IMission, IMissionCreator, IMissionGroup, IMissionQuery } from 'common-atom/interfaces/mission.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { getContext, isDirector } from 'shared-atom/utils/helpers/context';
import { Global } from 'common-atom/enums/helpers/Global';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { UsersRPCService } from 'shared-atom/utils/rpc/services/user.RPCservice';
import { Permission } from 'common-atom/enums/Permission';
import { EditorPermissionError } from './mission.errors';
import { MissionRepository } from './mission.repository';

export class MissionManager {
    static async getMissions(query: IMissionQuery): Promise<IMission[] | IMissionGroup> {
        return MissionRepository.getMissions({
            ...query,
            ...(!isDirector() && { editor: getContext(Global.USER)._id }),
        });
    }

    static async createMission(mission: IMissionCreator): Promise<IMission> {
        const { title, contentType, priority, editor, ...restOfMission } = mission;
        const editorUser = await UsersRPCService.getUserById(editor);
        if (editorUser.permission !== Permission.EDITOR) {
            throw new EditorPermissionError();
        }
        const item = await ItemRPCService.createMissionItem(title, contentType, priority);
        return MissionRepository.createMission({
            director: getContext(Global.USER)._id,
            item: item._id!,
            editor,
            ...restOfMission,
        });
    }

    static async updateMission(missionId: string, mission: Partial<IMission>): Promise<IMission> {
        const updatedMission = await MissionRepository.updateMission(missionId, mission);
        if (!updatedMission) {
            throw new IdNotFoundError('missionId');
        }
        return updatedMission;
    }

    static async deleteMission(missionId: string): Promise<IMission> {
        const deletedMission = await MissionRepository.deleteMission(missionId);
        if (!deletedMission) {
            throw new IdNotFoundError('missionId');
        }
        return deletedMission;
    }
}
