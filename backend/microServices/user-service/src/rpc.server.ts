import * as jayson from 'jayson/promise';
import { UserManager } from './user/user.manager';
import { canAddLastWatched, canGetUserById } from './user/user.validator';
import { RPCServerRequest } from '../shared/utils/rpc/rpc.functions';

export const RPCServer = new jayson.Server({
    getUserById: RPCServerRequest(UserManager.getUserById, canGetUserById),
    getAmountOfUsers: RPCServerRequest(UserManager.getAmountOfUsers),
    addLastWatched: RPCServerRequest(UserManager.addLastWatched, canAddLastWatched),
});
