import { IItem, IItemQuery } from 'common-atom/interfaces/item.interface';
import { IPaginator } from 'common-atom/interfaces/helpers/paginator.interface';
import config from '../config';
import HttpClient from '../utils/http.client';

const { api } = config.endpoints.item;

export default class ItemService {
    static getItems: (query: IItemQuery) => Promise<IItem[] | IPaginator<IItem>> = async (query) => {
        const params: any = {
            areaId: query.areaId,
            ...(query.search && { search: query.search }),
            ...(query.sections && { section: query.sections }),
            ...(query.categories && HttpClient.convertToArrayParams({ categories: query.categories })),
            ...(query.limit && { skip: query.skip, limit: query.limit }),
        };

        return HttpClient.get(`${api}/getItems`, params);
    };

    static getItemById: (itemId: string) => Promise<IItem> = async (itemId: string) => {
        return HttpClient.get(`${api}/getItemById`, { itemId });
    };
}
