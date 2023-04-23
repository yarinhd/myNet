import { Router } from 'express';
import { validateRequest, validateRequestByPermission } from 'shared-atom/utils/joi/joi.functions';
import { wrapController } from 'shared-atom/utils/helpers/wrapper';
import { config } from 'shared-atom/config';
import { Permission } from 'common-atom/enums/Permission';
import { validateUserAndPermission } from 'shared-atom/utils/validators/validator';
import { verifyToken } from 'shared-atom/utils/jwt/jwt';
import { formidableMiddleware } from 'shared-atom/utils/validators/formidable';
import { IItem } from 'common-atom/interfaces/item.interface';
import ItemController from './item.controller';
import { canGetItemByIdPublic, canGetItems, canUpdateItem } from './item.validator';

const ItemRouter: Router = Router();

ItemRouter.get(
    '/getItems',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetItems),
    wrapController(ItemController.getItems)
);

ItemRouter.get(
    '/getItemById',
    verifyToken,
    validateUserAndPermission(),
    validateRequest(canGetItemByIdPublic),
    wrapController(ItemController.getItemById)
);

ItemRouter.put(
    '/updateItem/:itemId',
    verifyToken,
    validateUserAndPermission([Permission.EDITOR, Permission.DIRECTOR]),
    formidableMiddleware<IItem>(config.formidable.propertyConfigs.item),
    validateRequestByPermission(canUpdateItem),
    wrapController(ItemController.updateItem)
);

export default ItemRouter;
