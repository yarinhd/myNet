/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { routeToRPCGetter } from './content.helpers';
import { IAllContent, IContentQuery } from '../../common/interfaces/content.interface';
import { ItemManager } from '../item/item.manager';
import { UsersRPCService } from '../../shared/utils/rpc/services/user.RPCservice';

export class ContentManager {
    static async getContentById(query: IContentQuery): Promise<IAllContent> {
        const res = await routeToRPCGetter(query);
        await ItemManager.increaseViewsAndPriority(query.item);
        await UsersRPCService.addLastWatched(query.item);
        return res;
    }
}
