import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiCoordinate, joiEnum, joiMongoId, joiPersonalId } from 'shared-atom/utils/joi/joi.types';
import { Section } from 'common-atom/enums/Section';
import { WatchMode } from 'common-atom/enums/WatchMode';
import { Permission } from 'common-atom/enums/Permission';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { LessonRPCService } from 'shared-atom/utils/rpc/services/lesson.RPCservice';
import { MediaRPCService } from 'shared-atom/utils/rpc/services/media.RPCservice';
import { UserManager } from './user.manager';

const Joi = JoiBase.extend(<any>joiDate);
//  RPC routes
export const canUpdateUser = Joi.object({
    userId: joiPersonalId.required(),
    dataToUpdate: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string()
    }).min(1).required(),
});

export const canAddLastWatched = Joi.object({
    itemId: joiMongoId(ItemRPCService.getItemById).required(),
});

//  public routes
export const canGetUserById = Joi.object({
    query: Joi.object({
        userId: joiPersonalId.required(),
    }).required(),
    body: {},
    params: {},
});

export const canGetUsers = Joi.object({
    query: Joi.object({
        search: Joi.string(),
        permission: joiEnum(Permission),
        skip: Joi.number().integer().min(0).required(),
        limit: Joi.number().integer().min(1).max(25).required(),
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
        area: joiMongoId(ItemRPCService.getAreaById),
        coordinate: joiCoordinate,
    })
        .xor('area', 'coordinate')
        .required(),
    params: {},
});

export const canUpdateUserPublic = [
    {
        permissions: [Permission.ADMIN],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                area: joiMongoId(ItemRPCService.getAreaById),
                coordinate: joiCoordinate,
                toggleFavorite: joiMongoId(ItemRPCService.getItemById),
                toggleEmployee: joiMongoId(UserManager.getUserById),
                permission: joiEnum(Permission),
            })
                .nand('area', 'coordinate')
                .without('permission', ['area', 'coordinate', 'toggleFavorite'])
                .without('toggleEmployee', ['area', 'coordinate', 'toggleFavorite'])
                .min(1)
                .required(),
            params: Joi.object({
                userId: joiPersonalId.required(),
            }).required(),
        }),
    },
    {
        permissions: [Permission.DIRECTOR],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                area: joiMongoId(ItemRPCService.getAreaById),
                coordinate: joiCoordinate,
                toggleFavorite: joiMongoId(ItemRPCService.getItemById),
                permission: Joi.string().valid(Permission.VIEWER, Permission.EDITOR, Permission.ORGANIZER),
            })
                .nand('area', 'coordinate')
                .without('permission', ['area', 'coordinate', 'toggleFavorite'])
                .min(1)
                .required(),
            params: Joi.object({
                userId: joiPersonalId.required(),
            }).required(),
        }),
    },
    {
        permissions: [Permission.ORGANIZER],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                area: joiMongoId(ItemRPCService.getAreaById),
                coordinate: joiCoordinate,
                toggleFavorite: joiMongoId(ItemRPCService.getItemById),
                toggleEmployee: joiMongoId(UserManager.getUserById),
                permission: Joi.string().valid(Permission.VIEWER, Permission.COMMANDER),
            })
                .nand('area', 'coordinate')
                .nand('permission', 'toggleEmployee')
                .without('permission', ['area', 'coordinate', 'toggleFavorite'])
                .without('toggleEmployee', ['area', 'coordinate', 'toggleFavorite'])
                .min(1)
                .required(),
            params: Joi.object({
                userId: joiPersonalId.required(),
            }).required(),
        }),
    },
    {
        permissions: [Permission.VIEWER, Permission.COMMANDER, Permission.EDITOR],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                area: joiMongoId(ItemRPCService.getAreaById),
                coordinate: joiCoordinate,
                toggleFavorite: joiMongoId(ItemRPCService.getItemById),
            })
                .nand('area', 'coordinate')
                .min(1)
                .required(),
            params: Joi.object({
                userId: joiPersonalId.required(),
            }).required(),
        }),
    },
];

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
