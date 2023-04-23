import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiMongoId } from '../../shared/utils/joi/joi.types';
import { TestManager } from '../test/test.manager';
import { ItemRPCService } from '../../shared/utils/rpc/services/item.RPCservice';

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
