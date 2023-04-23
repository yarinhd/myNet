import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiCoordinate, joiEnum, joiMongoId, joiPersonalId } from '../../shared/utils/joi/joi.types';
import { Section } from '../../common/enums/Section';
import { WatchMode } from '../../common/enums/WatchMode';
import { Permission } from '../../common/enums/Permission';
import { ItemRPCService } from '../../shared/utils/rpc/services/item.RPCservice';
import { UserManager } from './user.manager';
import { LessonRPCService } from '../../shared/utils/rpc/services/lesson.RPCservice';
import { MediaRPCService } from '../../shared/utils/rpc/services/media.RPCservice';

const Joi = JoiBase.extend(<any>joiDate);
//  RPC routes
export const canGetUserById = Joi.object({
    userId: joiMongoId().required(),
});

export const canAddLastWatched = Joi.object({
    itemId: joiMongoId(ItemRPCService.getItemById).required(),
});

//  public routes
export const canGetUsers = Joi.object({
    query: Joi.object({
        search: Joi.string(),
        permission: joiEnum(Permission),
        skip: Joi.number().integer().min(0).required(),
        limit: Joi.number().integer().min(1).required(),
    })
        .oxor('search', 'permission')
        .required(),
    body: {},
    params: {},
});

export const canGetLastWatched = Joi.object({
    query: Joi.object({
        area: joiMongoId().required(),
        section: joiEnum(Section).required(),
    }).required(),
    body: {},
    params: {},
});

export const canGetAmountOfUsers = Joi.object({
    query: Joi.object({
        permission: joiEnum(Permission).required(),
    }).required(),
    body: {},
    params: {},
});

export const canCreateUser = Joi.object({
    query: {},
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        personalId: joiPersonalId.required(),
        area: joiMongoId(ItemRPCService.getAreaById).required(),
    }).required(),
    params: {},
});

export const canUpdateUser = [
    {
        permissions: [Permission.ADMIN],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                personalId: joiPersonalId,
                area: joiMongoId(ItemRPCService.getAreaById),
                toggleFavorite: joiMongoId(ItemRPCService.getItemById),
                toggleEmployee: joiMongoId(UserManager.getUserById),
                permission: joiEnum(Permission),
            })
                .without('permission', ['firstName', 'lastName', 'personalId', 'area', 'toggleFavorite'])
                .without('toggleEmployee', ['firstName', 'lastName', 'personalId', 'area', 'toggleFavorite'])
                .min(1)
                .required(),
            params: Joi.object({
                userId: joiMongoId().required(),
            }).required(),
        }),
    },
    {
        permissions: [Permission.DIRECTOR],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                personalId: joiPersonalId,
                area: joiMongoId(ItemRPCService.getAreaById),
                toggleFavorite: joiMongoId(ItemRPCService.getItemById),
                permission: Joi.string().valid(Permission.VIEWER, Permission.EDITOR, Permission.ORGANIZER),
            })
                .without('permission', ['firstName', 'lastName', 'personalId', 'area', 'toggleFavorite'])
                .min(1)
                .required(),
            params: Joi.object({
                userId: joiMongoId().required(),
            }).required(),
        }),
    },
    {
        permissions: [Permission.ORGANIZER],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                personalId: joiPersonalId,
                area: joiMongoId(ItemRPCService.getAreaById),
                toggleFavorite: joiMongoId(ItemRPCService.getItemById),
                toggleEmployee: joiMongoId(UserManager.getUserById),
                permission: Joi.string().valid(Permission.VIEWER, Permission.COMMANDER),
            })
                .nand('permission', 'toggleEmployee')
                .without('permission', ['firstName', 'lastName', 'personalId', 'area', 'toggleFavorite'])
                .without('toggleEmployee', ['firstName', 'lastName', 'personalId', 'area', 'toggleFavorite'])
                .min(1)
                .required(),
            params: Joi.object({
                userId: joiMongoId().required(),
            }).required(),
        }),
    },
    {
        permissions: [Permission.VIEWER, Permission.COMMANDER, Permission.EDITOR],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                personalId: joiPersonalId,
                area: joiMongoId(ItemRPCService.getAreaById),
                toggleFavorite: joiMongoId(ItemRPCService.getItemById),
            })
                .min(1)
                .required(),
            params: Joi.object({
                userId: joiMongoId().required(),
            }).required(),
        }),
    },
];

export const canPatchRelevantArea = Joi.object({
    query: {},
    body: Joi.object({
        coordinate: joiCoordinate.required(),
    }).required(),
    params: {},
});

export const canPatchChapter = Joi.object({
    query: {},
    body: Joi.object({
        mode: joiEnum(WatchMode),
    })
        .min(1)
        .required(),
    params: Joi.object({
        chapterId: joiMongoId(LessonRPCService.getChapterById).required(),
    }).required(),
});

export const canPatchMedia = Joi.object({
    query: {},
    body: Joi.object({
        mode: joiEnum(WatchMode),
        note: Joi.string(),
    })
        .min(1)
        .required(),
    params: Joi.object({
        mediaId: joiMongoId(MediaRPCService.getMediaById).required(),
    }).required(),
});
