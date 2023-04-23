import * as jayson from 'jayson/promise';
import { RPCServerRequest } from 'shared-atom/utils/rpc/rpc.functions';
import { UserManager } from './user/user.manager';
import { canAddLastWatched, canUpdateUser, canGetUserById } from './user/user.validator';

export const RPCServer = new jayson.Server({
    getUserById: RPCServerRequest(UserManager.getUserById, canGetUserById),
    getAmountOfUsers: RPCServerRequest(UserManager.getAmountOfUsers),
    addLastWatched: RPCServerRequest(UserManager.addLastWatched, canAddLastWatched),
    updateUser: RPCServerRequest(UserManager.updateUser, canUpdateUser)
});
