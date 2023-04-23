import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { joiMongoId } from 'shared-atom/utils/joi/joi.types';
import { TestManager } from '../test/test.manager';

const Joi = JoiBase.extend(<any>joiDate);

export const canGetEmployeesTests = Joi.object({
    query: Joi.object({
        test: joiMongoId(),
        user: joiMongoId(),
    })
        .xor('test', 'user')
        .min(1)
        .required(),
    body: {},
    params: {},
});

export const canCreateTestByUser = Joi.object({
    query: {},
    body: Joi.object({
        test: joiMongoId(TestManager.getTestById).required(),
        item: joiMongoId(ItemRPCService.getItemById).required(),
        answers: Joi.array().items(Joi.string()).required(),
    }).required(),
    params: {},
});
