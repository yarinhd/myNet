/* eslint-disable no-param-reassign */
import { ContentType } from 'common-atom/enums/ContentType';
import { IUser } from 'common-atom/interfaces/user.interface';
import { getAllContent, IContent } from '../models/ContentItems';
import UserService from '../services/user';

export const getDateString = (date: Date | string) =>
    typeof date === 'string'
        ? date.substring(0, 10).split('-').reverse().join('.')
        : date.toISOString().substring(0, 10).split('-').reverse().join('.');
export const getTimeToReadString = (timeToRead: number, t: any) =>
    `${timeToRead >= 60 ? '60+' : timeToRead} ${t('ITEM.MINUTES')}`;

export const getContent = (contentType: ContentType) => {
    const allContent = getAllContent({
        fontSize: '15px',
        color: 'white',
        marginLeft: '7px',
    });
    return allContent.find((content: IContent) => content.title === contentType.toUpperCase()) || allContent[0];
};

export const toggleFavorite = async (dispatch: any, user: IUser | null, itemId?: string) => {
    if (user?._id && itemId) {
        const newUser = await UserService.updateUser(user?._id, { toggleFavorite: itemId });
        dispatch({ type: 'SET_USER', payload: newUser });
    }
};

export const groupBy = (array: any[], fieldName: string) => {
    return array.reduce((group: any, obj: any) => {
        const field = obj[fieldName];
        group[field] = group[field] ?? [];
        group[field].push(obj);
        return group;
    }, {});
};

export const sortObjectKeys = (object: { [key: string]: any[] }) => {
    return Object.keys(object)
        .sort()
        .reduce((obj: any, key: any) => {
            obj[key] = object[key];
            return obj;
        }, {});
};
