import { IUserUpdater } from 'common-atom/interfaces/user.interface';
import { WatchMode } from 'common-atom/enums/WatchMode';
import IUser from '../models/User';
import config from '../config';
import HttpClient from '../utils/http.client';

const { api } = config.endpoints.user;

export default class UserService {
    static updateUser: (userId: string, dataToUpdate: Partial<IUserUpdater>) => Promise<IUser> = async (
        userId: string,
        dataToUpdate: Partial<IUserUpdater>
    ) => {
        return HttpClient.put(`${api}/updateUser/${userId}`, dataToUpdate);
    };

    static patchChapter: (userId: string, chapterId: string, watchMode: WatchMode) => Promise<IUser> = async (
        userId: string,
        chapterId: string,
        watchMode: WatchMode
    ) => {
        return HttpClient.put(`${api}/patchChapter/${userId}?chapterId=${chapterId}`, { mode: watchMode });
    };
}
