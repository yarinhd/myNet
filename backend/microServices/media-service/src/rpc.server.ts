import * as jayson from 'jayson/promise';
import { RPCServerRequest } from '../shared/utils/rpc/rpc.functions';
import { InfographicManager } from './infographic/infographic.manager';
import { canGetInfographicById } from './infographic/infographic.validator';
import { MediaManager } from './media/media.manager';
import { canGetMediaById } from './media/media.validator';

export const RPCServer = new jayson.Server({
    getMediaById: RPCServerRequest(MediaManager.getMediaById, canGetMediaById),
    getInfographicById: RPCServerRequest(InfographicManager.getInfographicById, canGetInfographicById),
});
