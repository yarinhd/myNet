import * as mongoose from 'mongoose';
import { IItem, IItemQuery, IMissionItem, missionItemKeys } from 'common-atom/interfaces/item.interface';
import { ContentType } from 'common-atom/enums/ContentType';
import { IPaginator } from 'common-atom/interfaces/helpers/paginator.interface';
import { Global } from 'common-atom/enums/helpers/Global';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { getContext, isDirector } from 'shared-atom/utils/helpers/context';
import { ItemRepository } from './item.repository';
import { ForbiddenPropertiesError } from './item.errors';

export class ItemManager {
    // helpers
    private static addUpdateDetails(item: IItem | Partial<IItem>): IItem | Partial<IItem> {
        let finalItem = item;
        if (!(Object.keys(item).length === 1 && !!item.priority)) {
            finalItem = { ...item, updatedAt: new Date(), editedBy: getContext(Global.USER)._id };
        }
        return finalItem;
    }

    // RPC & private routes
    static async getItemById(itemId: string): Promise<IItem> {
        const item = await ItemRepository.getItemById(itemId);
        if (!item) {
            throw new IdNotFoundError('itemId');
        }
        return item;
    }

    static async getItemByContentId(contentId: string): Promise<IItem> {
        const item = await ItemRepository.getItemByContentId(contentId);
        if (!item) {
            throw new IdNotFoundError('itemId');
        }
        return item;
    }

    static async createMissionItem(title: string, contentType: ContentType, priority?: number): Promise<IItem> {
        const finalDataToCreate = ItemManager.addUpdateDetails({
            title,
            contentType,
            ...(priority && { priority }),
            contentId: mongoose.Types.ObjectId().toString(),
            isByMission: true,
        });
        return ItemRepository.createItem(finalDataToCreate as IItem);
    }

    static async createItem(item: IItem): Promise<IItem> {
        const finalDataToCreate = ItemManager.addUpdateDetails(item);
        return ItemRepository.createItem(finalDataToCreate as IItem);
    }

    // public routes
    static async getItems(query: IItemQuery): Promise<IItem[] | IPaginator<IItem>> {
        return ItemRepository.getItems({ ...query, ...(!isDirector() && { isActive: true }) });
    }

    static async updateItem(itemId: string, item: Partial<IItem | IMissionItem>): Promise<IItem> {
        if (!isDirector()) {
            const itemToUpdate = await ItemManager.getItemById(itemId);
            if (itemToUpdate.isByMission && missionItemKeys.some((key: keyof IMissionItem) => !!item[key])) {
                throw new ForbiddenPropertiesError();
            }
        }
        const finalDataToUpdate = ItemManager.addUpdateDetails(item);
        const updatedItem = await ItemRepository.updateItem(itemId, finalDataToUpdate);
        if (!updatedItem) {
            throw new IdNotFoundError('itemId');
        }
        return updatedItem;
    }

    static async increaseViewsAndPriority(itemId: string): Promise<IItem> {
        const updatedItem = await ItemRepository.increaseViewsAndPriority(itemId);
        if (!updatedItem) {
            throw new IdNotFoundError('itemId');
        }
        return updatedItem;
    }
}
