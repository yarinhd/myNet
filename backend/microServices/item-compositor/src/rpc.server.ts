import * as jayson from 'jayson/promise';
import { RPCServerRequest } from '../shared/utils/rpc/rpc.functions';
import { AreaManager } from './area/area.manager';
import { canGetAreaById, canGetRelevantArea } from './area/area.validator';
import { ItemManager } from './item/item.manager';
import { canCreateMissionItem, canGetItemById, canCreateItem, canGetItemByContentId } from './item/item.validator';
import { UnitManager } from './unit/unit.manager';
import { canGetUnitById } from './unit/unit.validator';

export const RPCServer = new jayson.Server({
    getItemById: RPCServerRequest(ItemManager.getItemById, canGetItemById),
    getItemByContentId: RPCServerRequest(ItemManager.getItemByContentId, canGetItemByContentId),
    createMissionItem: RPCServerRequest(ItemManager.createMissionItem, canCreateMissionItem),
    createItem: RPCServerRequest(ItemManager.createItem, canCreateItem),
    getAreaById: RPCServerRequest(AreaManager.getAreaById, canGetAreaById),
    getAreas: RPCServerRequest(AreaManager.getAreas),
    getRelevantArea: RPCServerRequest(AreaManager.getRelevantArea, canGetRelevantArea),
    getUnitById: RPCServerRequest(UnitManager.getUnitById, canGetUnitById),
});
