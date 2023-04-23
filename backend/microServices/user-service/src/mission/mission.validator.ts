import * as JoiBase from 'joi';
import joiDate from '@joi/date';
import { joiEnum, joiMongoId } from '../../shared/utils/joi/joi.types';
import { Permission } from '../../common/enums/Permission';
import { WatchMode } from '../../common/enums/WatchMode';
import { UserManager } from '../user/user.manager';
import { ContentType } from '../../common/enums/ContentType';

const Joi = JoiBase.extend(<any>joiDate);

export const canGetMissions = Joi.object({
    query: Joi.object({
        startDate: Joi.date().utc().format(['DD/MM/YYYY', 'YYYY-MM-DD']).required(),
        endDate: Joi.date().utc().format(['DD/MM/YYYY', 'YYYY-MM-DD']).min(Joi.ref('startDate')).required(),
    }).required(),
    body: {},
    params: {},
});

export const canCreateMission = Joi.object({
    query: {},
    body: Joi.object({
        title: Joi.string().required(),
        contentType: joiEnum(ContentType).required(),
        startDate: Joi.date().utc().format(['DD/MM/YYYY', 'YYYY-MM-DD']),
        complitionDate: Joi.date().utc().format(['DD/MM/YYYY', 'YYYY-MM-DD']).min(Joi.ref('startDate')),
        editor: joiMongoId(UserManager.getUserById).required(),
        notes: Joi.string(),
    }).required(),
    params: {},
});

export const canUpdateMission = [
    {
        permissions: [Permission.DIRECTOR, Permission.ADMIN],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                startDate: Joi.date().utc().format(['DD/MM/YYYY', 'YYYY-MM-DD']),
                complitionDate: Joi.date().utc().format(['DD/MM/YYYY', 'YYYY-MM-DD']).min(Joi.ref('startDate')),
                editor: joiMongoId(UserManager.getUserById),
                notes: Joi.string(),
                status: joiEnum(WatchMode),
            })
                .min(1)
                .required(),
            params: Joi.object({
                missionId: joiMongoId().required(),
            }).required(),
        }),
    },
    {
        permissions: [Permission.EDITOR],
        schema: Joi.object({
            query: {},
            body: Joi.object({
                status: joiEnum(WatchMode),
            })
                .min(1)
                .required(),
            params: Joi.object({
                missionId: joiMongoId().required(),
            }).required(),
        }),
    },
];

export const canDeleteMission = Joi.object({
    query: {},
    body: {},
    params: Joi.object({
        missionId: joiMongoId().required(),
    }).required(),
});
