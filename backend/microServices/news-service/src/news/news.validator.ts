import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiEnum, joiMongoId } from '../../shared/utils/joi/joi.types';
import { ItemRPCService } from '../../shared/utils/rpc/services/item.RPCservice';
import { AreaNames } from '../../common/enums/AreaNames';

const Joi = JoiBase.extend(<any>joiDate);

// RPC & private routes
export const canUpdateSocketRoom = Joi.object({
    joinRoomId: joiEnum(AreaNames).required(),
    leaveRoomId: joiEnum(AreaNames).required(),
});

// public routes
export const canGetNews = Joi.object({
    query: Joi.object({
        area: joiMongoId().required(),
    }).required(),
    body: {},
    params: {},
});

export const canCreateNews = Joi.object({
    query: {},
    body: Joi.object({
        area: joiMongoId(ItemRPCService.getAreaById).required(),
        description: Joi.string().required(),
    }).required(),
    params: {},
});
