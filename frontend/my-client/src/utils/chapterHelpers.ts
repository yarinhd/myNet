import { WatchMode } from 'common-atom/enums/WatchMode';
import { IUser } from 'common-atom/interfaces/user.interface';
import UserService from '../services/user';

export const viewedChapter = async (dispatch: any, user: IUser | null, chapterId?: string) => {
    if (user?._id && chapterId) {
        const updateUser = await UserService.patchChapter(user._id, chapterId, WatchMode.MIDDLE);
        dispatch({ type: 'SET_USER', payload: updateUser });
    }
};

export const finishChapter = async (dispatch: any, user: IUser | null, chapterId?: string) => {
    if (user?._id && chapterId) {
        const updateUser = await UserService.patchChapter(user._id, chapterId, WatchMode.COMPLETE);
        dispatch({ type: 'SET_USER', payload: updateUser });
    }
};
