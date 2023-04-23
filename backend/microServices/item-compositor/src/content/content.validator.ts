import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiEnum, joiMongoId } from '../../shared/utils/joi/joi.types';
import { ContentType } from '../../common/enums/ContentType';

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
