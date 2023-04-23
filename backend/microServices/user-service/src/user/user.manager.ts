import {
    ILastWatchedQuery,
    IUser,
    IUserAmountQuery,
    IUserChapterPatch,
    IUserMediaPatch,
    IUserQuery,
    IUserUpdater,
    otherUserKeys,
} from '../../common/interfaces/user.interface';
import { UserRepository } from './user.repository';
import { IItem } from '../../common/interfaces/item.interface';
import { ItemRPCService } from '../../shared/utils/rpc/services/item.RPCservice';
import { IdNotFoundError } from '../../shared/utils/errors/validationError';
import { WrongUserError } from './user.errors';
import { IArea, ICoordinate } from '../../common/interfaces/area.interface';
import { NewsRPCService } from '../../shared/utils/rpc/services/news.RPCservice';
import { Global } from '../../common/enums/helpers/Global';
import { getContext } from '../../shared/utils/helpers/context';
import { PatcherService } from '../../shared/utils/patcher/patcherService';

export class UserManager {
    // RPC & private routes
    static async getUserById(userId: string): Promise<IUser> {
        const user = await UserRepository.getUserById(userId);
        if (!user) {
            throw new IdNotFoundError('userId');
        }
        return user;
    }

    static async addLastWatched(itemId: string): Promise<IUser | null> {
        const updatedUser = await UserRepository.addLastWatched(getContext(Global.USER)._id, itemId);
        if (!updatedUser) {
            throw new IdNotFoundError('userId');
        }
        return updatedUser;
    }

    // public routes
    static async getUsers(query: IUserQuery): Promise<IUser[]> {
        return UserRepository.getUsers(query);
    }

    static async getLastWatched(query: ILastWatchedQuery): Promise<IItem[]> {
        return UserRepository.getLastWatched(getContext(Global.USER)._id, query);
    }

    static async getAmountOfUsers(query?: IUserAmountQuery): Promise<number> {
        return UserRepository.getAmountOfUsers(query);
    }

    static async createUser(user: IUser): Promise<IUser> {
        const createdUser = await UserRepository.createUser(user);
        const areaOfUser = await ItemRPCService.getAreaById(user.area as string);
        await NewsRPCService.updateSocketRoom(areaOfUser.name);
        return PatcherService.userPatcher(createdUser as IUser) as Promise<IUser>;
    }

    static async updateUser(userId: string, dataToUpdate: Partial<IUserUpdater>): Promise<IUser> {
        if (
            userId === getContext(Global.USER)._id &&
            otherUserKeys.some((key: keyof IUserUpdater) => !!dataToUpdate[key])
        ) {
            throw new WrongUserError();
        }
        const oldUser = await UserManager.getUserById(userId);
        const updatedUser = await UserRepository.updateUser(userId, dataToUpdate);
        if (!updatedUser) {
            throw new IdNotFoundError('userId');
        }
        if (dataToUpdate.area) {
            const areaOfUser = await ItemRPCService.getAreaById(dataToUpdate.area as string);
            await NewsRPCService.updateSocketRoom(areaOfUser.name, (oldUser.area as IArea).name);
        }
        return PatcherService.userPatcher(updatedUser as IUser) as Promise<IUser>;
    }

    static async patchRelevantArea(body: ICoordinate): Promise<IUser> {
        const area = await ItemRPCService.getRelevantArea(body.coordinate);
        const updatedUser = await UserManager.updateUser(getContext(Global.USER)._id, { area: area._id });
        return PatcherService.userPatcher(updatedUser as IUser) as Promise<IUser>;
    }

    static async patchChapter(chapterId: string, body: IUserChapterPatch): Promise<IUser> {
        const patchedUser = await UserRepository.patchChapter(getContext(Global.USER)._id, chapterId, body);
        if (!patchedUser) {
            throw new IdNotFoundError('userId');
        }
        return PatcherService.userPatcher(patchedUser as IUser) as Promise<IUser>;
    }

    static async patchMedia(mediaId: string, body: IUserMediaPatch): Promise<IUser> {
        const patchedUser = await UserRepository.patchMedia(getContext(Global.USER)._id, mediaId, body);
        if (!patchedUser) {
            throw new IdNotFoundError('userId');
        }
        return PatcherService.userPatcher(patchedUser as IUser) as Promise<IUser>;
    }
}
