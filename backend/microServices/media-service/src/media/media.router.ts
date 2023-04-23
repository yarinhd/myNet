import { Router } from 'express';
import { validateRequest } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { Permission } from 'common-atom/enums/Permission';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { IMedia } from 'common-atom/interfaces/media.interface';
import { formidableMiddleware } from 'shared-atom/utils/validators/formidable';
import { config } from 'shared-atom/config';
import MediaController from './media.controller';
import { canCreateMedia, canUpdateMedia } from './media.validator';

const MediaRouter: Router = Router();

MediaRouter.post(
    '/createMedia',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IMedia>(config.formidable.propertyConfigs.media, true),
    validateRequest(canCreateMedia),
    wrapController(MediaController.createMedia)
);

MediaRouter.put(
    '/updateMedia/:mediaId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IMedia>(config.formidable.propertyConfigs.media),
    validateRequest(canUpdateMedia),
    wrapController(MediaController.updateMedia)
);

export default MediaRouter;
