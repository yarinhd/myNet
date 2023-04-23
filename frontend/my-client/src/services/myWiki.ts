import { IMyWiki } from 'common-atom/interfaces/myWiki.interface';
import { IPaginator } from 'common-atom/interfaces/helpers/paginator.interface';
import config from '../config';
import HttpClient from '../utils/http.client';

const { api } = config.endpoints.myWiki;

export default class MyWikiService {
    static getMyWiki: (skip: number, limit: number, search?: string) => Promise<IPaginator<IMyWiki>> = async (
        skip: number,
        limit: number,
        search?: string
    ) => {
        const params = search ? { skip, limit, search } : { skip, limit };
        return HttpClient.get(`${api}/getMyWiki`, params);
    };

    static createMyWiki: (myWiki: IMyWiki) => Promise<IMyWiki> = async (myWiki: IMyWiki) => {
        return HttpClient.post(`${api}/createMyWiki`, myWiki);
    };

    static editMyWiki: (myWiki: IMyWiki, idMyWiki: string) => Promise<IMyWiki> = async (
        myWiki: IMyWiki,
        idMyWiki: string
    ) => {
        return HttpClient.put(`${api}/updateMyWiki/${idMyWiki}`, myWiki);
    };

    static deleteMyWiki: (idMyWiki: string) => Promise<void> = async (idMyWiki: string) => {
        return HttpClient.delete(`${api}/deleteMyWiki/${idMyWiki}`);
    };
}
