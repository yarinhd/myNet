/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UsersRPCService } from 'shared-atom/utils/rpc/services/user.RPCservice';
import { IAllContent, IContentQuery } from 'common-atom/interfaces/content.interface';
import { routeToRPCGetter } from './content.helpers';
import { ItemManager } from '../item/item.manager';

export class ContentManager {
    static async getContentById(query: IContentQuery): Promise<IAllContent> {
        const res = await routeToRPCGetter(query);
        await ItemManager.increaseViewsAndPriority(query.item);
        await UsersRPCService.addLastWatched(query.item);
        return res;
    }
}
