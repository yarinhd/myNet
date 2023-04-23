import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { ContentType } from '../../common/enums/ContentType';
import { Grade } from '../../common/enums/Grade';
import { Section } from '../../common/enums/Section';
import { Category } from '../../common/enums/Category';
import { Corp } from '../../common/enums/Corp';
import { Permission } from '../../common/enums/Permission';
import { joiEnum, joiBlob, joiMongoId, joiMongoIdArray, joiPriority } from '../../shared/utils/joi/joi.types';
import { AreaManager } from '../area/area.manager';
import { UnitManager } from '../unit/unit.manager';
import { ItemManager } from './item.manager';

const Joi = JoiBase.extend(<any>joiDate);

// RPC & private routes
export const canGetItemById = Joi.object({
    itemId: joiMongoId().required(),
});

export const canGetItemByContentId = Joi.object({
    contentId: joiMongoId().required(),
});

export const canCreateMissionItem = Joi.object({
    title: Joi.string().required(),
    contentType: joiEnum(ContentType).required(),
    priority: joiPriority,
});

export const canCreateItem = Joi.object({
    item: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        timeToRead: Joi.number().integer().required(),
        thumbNail: joiBlob.required(),
        unit: joiMongoId(UnitManager.getUnitById).required(),
        contentId: joiMongoId().required(),
        similarItems: joiMongoIdArray(ItemManager.getItemById),
        areas: joiMongoIdArray(AreaManager.getAreaById).min(1).required(),
        sections: Joi.array().items(joiEnum(Section)).min(1).required(),
        categories: Joi.array().items(joiEnum(Category)).min(1).required(),
        corps: Joi.array().items(joiEnum(Corp)).min(1).required(),
        grade: joiEnum(Grade).required(),
        contentType: joiEnum(ContentType).required(),
        priority: joiPriority,
    }).required(),
}).required();

// public routes
export const canGetItems = Joi.object({
    query: Joi.object({
        areaId: joiMongoId(),
        section: joiEnum(Section),
        category: joiEnum(Category),
        contentType: joiEnum(ContentType),
        search: Joi.string(),
        skip: Joi.number().integer().min(0),
        limit: Joi.number().integer().min(1),
    })
        .and('skip', 'limit')
        .with('search', ['skip', 'limit'])
        .with('category', ['skip', 'limit'])
        .without('search', ['areaId', 'section', 'category', 'contentType'])
        .when(Joi.object({ skip: Joi.exist(), limit: Joi.exist() }).unknown(), {
            then: Joi.object({
                category: Joi.optional(),
                search: Joi.optional(),
            }).xor('category', 'search'),
        })
        .required(),
    body: {},
    params: {},
});

export const canUpdateItem = [
    {
        permissions: [Permission.ADMIN, Permission.DIRECTOR],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                title: Joi.string(),
                description: Joi.string(),
                timeToRead: Joi.number().integer(),
                thumbNail: joiBlob,
                unit: joiMongoId(UnitManager.getUnitById),
                similarItems: joiMongoIdArray(ItemManager.getItemById),
                areas: joiMongoIdArray(AreaManager.getAreaById).min(1),
                sections: Joi.array().items(joiEnum(Section)).min(1),
                categories: Joi.array().items(joiEnum(Category)).min(1),
                corps: Joi.array().items(joiEnum(Corp)).min(1),
                grade: joiEnum(Grade),
                priority: joiPriority,
                isActive: Joi.boolean(),
            })
                .min(1)
                .required(),
            params: Joi.object({
                itemId: joiMongoId().required(),
            }).required(),
        }),
    },
    {
        permissions: [Permission.EDITOR],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                title: Joi.string(),
                description: Joi.string(),
                timeToRead: Joi.number().integer(),
                thumbNail: joiBlob,
                unit: joiMongoId(UnitManager.getUnitById),
                similarItems: joiMongoIdArray(ItemManager.getItemById),
                areas: joiMongoIdArray(AreaManager.getAreaById).min(1),
                sections: Joi.array().items(joiEnum(Section)).min(1),
                categories: Joi.array().items(joiEnum(Category)).min(1),
                corps: Joi.array().items(joiEnum(Corp)).min(1),
                grade: joiEnum(Grade),
                priority: joiPriority,
            })
                .min(1)
                .required(),
            params: Joi.object({
                itemId: joiMongoId().required(),
            }).required(),
        }),
    },
];
