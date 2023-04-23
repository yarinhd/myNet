import * as jayson from 'jayson/promise';
import { RPCServerRequest } from '../shared/utils/rpc/rpc.functions';
import { updateSocketRoom } from '../shared/utils/schema/helpers/socketHelpers';
import { canUpdateSocketRoom } from './news/news.validator';

export const RPCServer = new jayson.Server({
    updateSocketRoom: RPCServerRequest(updateSocketRoom, canUpdateSocketRoom),
});
