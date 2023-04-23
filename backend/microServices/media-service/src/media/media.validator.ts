import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiMongoId, joiBlob, joiContentCreator } from 'shared-atom/utils/joi/joi.types';

const Joi = JoiBase.extend(<any>joiDate);

//  RPC routes
export const canGetMediaById = Joi.object({
    mediaId: joiMongoId().required(),
});

//  public routes
export const canCreateMedia = joiContentCreator(
    Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        audio: joiBlob,
        video: joiBlob,
    }).xor('audio', 'video')
);

export const canUpdateMedia = Joi.object({
    query: {},
    body: Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        audio: joiBlob,
        video: joiBlob,
    })
        .oxor('audio', 'video')
        .min(1)
        .required(),
    params: Joi.object({
        mediaId: joiMongoId().required(),
    }).required(),
});
