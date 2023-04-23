import * as jayson from 'jayson/promise';
import { RPCServerRequest } from 'shared-atom/utils/rpc/rpc.functions';
import { updateSocketRoom } from 'shared-atom/utils/schema/helpers/socketHelpers';
import { canUpdateSocketRoom } from './news/news.validator';

export const RPCServer = new jayson.Server({
    updateSocketRoom: RPCServerRequest(updateSocketRoom, canUpdateSocketRoom),
});
