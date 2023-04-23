import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiEnum, joiBlob, joiMongoId, joiPoligon, joiCoordinate } from 'shared-atom/utils/joi/joi.types';
import { AreaNames } from 'common-atom/enums/AreaNames';

const Joi = JoiBase.extend(<any>joiDate);

// RPC & private routes
export const canGetAreaById = Joi.object({
    areaId: joiMongoId().required(),
});

export const canGetRelevantArea = Joi.object({
    coordinate: joiCoordinate.required(),
});

// public routes
export const canCreateArea = Joi.object({
    query: {},
    body: Joi.object({
        name: joiEnum(AreaNames).required(),
        image: joiBlob.required(),
        polygon: joiPoligon.required(),
    }).required(),
    params: {},
});

export const canUpdateArea = Joi.object({
    query: {},
    body: Joi.object({
        name: joiEnum(AreaNames),
        image: joiBlob,
        polygon: joiPoligon,
    })
        .min(1)
        .required(),
    params: Joi.object({
        areaId: joiMongoId().required(),
    }).required(),
});
