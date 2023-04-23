import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiBlob, joiMongoId } from 'shared-atom/utils/joi/joi.types';

const Joi = JoiBase.extend(<any>joiDate);

// RPC & private routes
export const canGetUnitById = Joi.object({
    unitId: joiMongoId().required(),
});

// public routes
export const canCreateUnit = Joi.object({
    query: {},
    body: Joi.object({
        name: Joi.string().required(),
        image: joiBlob.required(),
    }).required(),
    params: {},
});

export const canUpdateUnit = Joi.object({
    query: {},
    body: Joi.object({
        name: Joi.string(),
        image: joiBlob,
    })
        .min(1)
        .required(),
    params: Joi.object({
        unitId: joiMongoId().required(),
    }).required(),
});
