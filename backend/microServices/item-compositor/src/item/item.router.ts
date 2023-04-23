import { Router } from 'express';
import { validateRequest, validateRequestByPermission } from '../../shared/utils/joi/joi.functions';
import { wrapController } from '../../shared/utils/helpers/wrapper';
import ItemController from './item.controller';
import { canGetItems, canUpdateItem } from './item.validator';
import { Permission } from '../../common/enums/Permission';
import { validateUserAndPermission } from '../../shared/utils/validators/validator';
import { verifyToken } from '../../shared/utils/jwt/jwt';
import { multerMiddleware } from '../../shared/utils/validators/multer';
import { IItem } from '../../common/interfaces/item.interface';
import { config } from '../../shared/config';

const ItemRouter: Router = Router();

ItemRouter.get(
    '/getItems',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetItems),
    wrapController(ItemController.getItems)
);

ItemRouter.put(
    '/updateItem/:itemId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    validateRequestByPermission(canUpdateItem),
    multerMiddleware<IItem>(config.multer.propertyConfigs.item),
    wrapController(ItemController.updateItem)
);

export default ItemRouter;
