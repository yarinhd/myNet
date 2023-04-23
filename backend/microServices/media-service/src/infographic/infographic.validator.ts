import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiMongoId, joiBlob, joiContentCreator } from 'shared-atom/utils/joi/joi.types';

const Joi = JoiBase.extend(<any>joiDate);

//  RPC routes
export const canGetInfographicById = Joi.object({
    infographicId: joiMongoId().required(),
});

//  public routes
export const canCreateInfographic = joiContentCreator(
    Joi.object({
        image: joiBlob.required(),
    })
);

export const canUpdateInfographic = Joi.object({
    query: {},
    body: Joi.object({
        image: joiBlob,
    })
        .min(1)
        .required(),
    params: Joi.object({
        infographicId: joiMongoId().required(),
    }).required(),
});
