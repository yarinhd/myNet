import { Router } from 'express';
import { validateRequest } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import MediaController from './media.controller';
import { canCreateMedia, canUpdateMedia } from './media.validator';
import { Permission } from '../../common/enums/Permission';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { IMedia } from '../../common/interfaces/media.interface';
import { multerMiddleware } from '../../shared/utils/validators/multer';
import { config } from '../../shared/config';

const MediaRouter: Router = Router();

MediaRouter.post(
    '/createMedia',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canCreateMedia),
    multerMiddleware<IMedia>(config.multer.propertyConfigs.media),
    wrapController(MediaController.createMedia)
);

MediaRouter.put(
    '/updateMedia/:mediaId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequest(canUpdateMedia),
    multerMiddleware<IMedia>(config.multer.propertyConfigs.media),
    wrapController(MediaController.updateMedia)
);

export default MediaRouter;
