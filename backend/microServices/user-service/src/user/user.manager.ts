import {
    ILastWatchedQuery,
    IUser,
    IUserAmountQuery,
    IUserChapterPatch,
    IUserMediaPatch,
    IUserQuery,
    IUserUpdater,
    otherUserKeys,
} from 'common-atom/interfaces/user.interface';
import { UserRepository } from './user.repository';
import { IItem } from 'common-atom/interfaces/item.interface';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { WrongUserError } from './user.errors';
import { IArea, ICoordinate } from 'common-atom/interfaces/area.interface';
import { NewsRPCService } from 'shared-atom/utils/rpc/services/news.RPCservice';
import { Global } from 'common-atom/enums/helpers/Global';
import { getContext } from 'shared-atom/utils/helpers/context';

export class UserManager {
    // helpers
    private static async areaCalculator(
        userData: (Partial<IUser> & Partial<ICoordinate>) | (Partial<IUserUpdater> & Partial<ICoordinate>)
    ): Promise<IUser | Partial<IUserUpdater>> {
        let relevantAreaId;
        if (userData.coordinate) {
            relevantAreaId = (await ItemRPCService.getRelevantArea(userData.coordinate))._id;
        }
        const finalUser = { ...userData, ...(relevantAreaId && { area: relevantAreaId as string }) };
        if (finalUser.coordinate) {
            delete finalUser.coordinate;
        }
        return finalUser;
    }

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

    static async createUser(user: Partial<IUser> & Partial<ICoordinate>): Promise<IUser> {
        const finalUser = {
            ...((await UserManager.areaCalculator(user)) as IUser),
            _id: getContext(Global.AZURE_USER).upn.split('@')[0],
            firstName: getContext(Global.AZURE_USER).given_name,
            lastName: getContext(Global.AZURE_USER).family_name,
        };
        const createdUser = await UserRepository.createUser(finalUser);
        await NewsRPCService.updateSocketRoom((createdUser.area as IArea).name);
        return createdUser;
    }

    static async updateUser(
        userId: string,
        dataToUpdate: Partial<IUserUpdater> & Partial<ICoordinate>
    ): Promise<IUser> {
        const finalDataToUpdate = await UserManager.areaCalculator(dataToUpdate);
        const updatedUser = await UserRepository.updateUser(userId, finalDataToUpdate);
        if (!updatedUser) {
            throw new IdNotFoundError('userId');
        }
        return updatedUser;
    }

    static async updateUserPublic(
        userId: string,
        dataToUpdate: Partial<IUserUpdater> & Partial<ICoordinate>
    ): Promise<IUser> {
        if (
            userId === getContext(Global.USER)._id &&
            otherUserKeys.some((key: keyof IUserUpdater) => !!dataToUpdate[key])
        ) {
            throw new WrongUserError();
        }
        const oldUser = await UserManager.getUserById(userId);
        const finalDataToUpdate = await UserManager.areaCalculator(dataToUpdate);
        const updatedUser = await UserRepository.updateUser(userId, finalDataToUpdate);
        if (!updatedUser) {
            throw new IdNotFoundError('userId');
        }
        if (finalDataToUpdate.area) {
            await NewsRPCService.updateSocketRoom((updatedUser.area as IArea).name, (oldUser.area as IArea).name);
        }
        return updatedUser;
    }

    static async patchChapter(chapterId: string, body: IUserChapterPatch): Promise<IUser> {
        const patchedUser = await UserRepository.patchChapter(getContext(Global.USER)._id, chapterId, body);
        if (!patchedUser) {
            throw new IdNotFoundError('userId');
        }
        return patchedUser;
    }

    static async patchMedia(mediaId: string, body: IUserMediaPatch): Promise<IUser> {
        const patchedUser = await UserRepository.patchMedia(getContext(Global.USER)._id, mediaId, body);
        if (!patchedUser) {
            throw new IdNotFoundError('userId');
        }
        return patchedUser;
    }
}
