import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiEnum, joiMongoId } from 'shared-atom/utils/joi/joi.types';
import { ContentType } from 'common-atom/enums/ContentType';

const Joi = JoiBase.extend(<any>joiDate);

export const canGetContentById = Joi.object({
    query: Joi.object({
        item: joiMongoId().required(),
        contentId: joiMongoId().required(),
        contentType: joiEnum(ContentType).required(),
    }).required(),
    body: {},
    params: {},
});
