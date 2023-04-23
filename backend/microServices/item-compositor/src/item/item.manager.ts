import * as mongoose from 'mongoose';
import { IItem, IItemGroup, IItemQuery, IMissionItem, missionItemKeys } from '../../common/interfaces/item.interface';
import { ContentType } from '../../common/enums/ContentType';
import { IPaginator, paginationKeys } from '../../common/interfaces/helpers/paginator.interface';
import { Global } from '../../common/enums/helpers/Global';
import { ItemRepository } from './item.repository';
import { IdNotFoundError } from '../../shared/utils/errors/validationError';
import { getContext, isDirector } from '../../shared/utils/helpers/context';
import { ForbiddenPropertiesError } from './item.errors';
import { PatcherService } from '../../shared/utils/patcher/patcherService';

export class ItemManager {
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
        return ItemRepository.createItem({
            title,
            contentType,
            ...(priority && { priority }),
            editedBy: getContext(Global.USER)._id,
            contentId: mongoose.Types.ObjectId().toString(),
            isByMission: true,
        });
    }

    static async createItem(item: IItem): Promise<IItem> {
        const createdItems = await ItemRepository.createItem({ ...item, editedBy: getContext(Global.USER)._id });
        return PatcherService.itemPatcher(createdItems as IItem) as Promise<IItem>;
    }

    // public routes
    static async getItems(query: IItemQuery): Promise<IItem[] | IItemGroup[] | IPaginator<IItem>> {
        const items = await ItemRepository.getItems({ ...query, ...(!isDirector() && { isActive: true }) });

        if (!query.category && !query.search) {
            return PatcherService.itemGroupPatcher(items as IItemGroup[]) as Promise<IItemGroup[]>;
        }
        return paginationKeys.some((key: keyof IItemQuery) => query[key] !== undefined)
            ? (PatcherService.paginatedItemsPatcher(items as IPaginator<IItem>) as Promise<IPaginator<IItem>>)
            : (PatcherService.itemPatcher(items as IItem[]) as Promise<IItem[]>);
    }

    static async updateItem(itemId: string, item: Partial<IItem | IMissionItem>): Promise<IItem> {
        if (!isDirector()) {
            const itemToUpdate = await ItemManager.getItemById(itemId);
            if (itemToUpdate.isByMission && missionItemKeys.some((key: keyof IMissionItem) => !!item[key])) {
                throw new ForbiddenPropertiesError();
            }
        }
        const updatedItem = await ItemRepository.updateItem(itemId, { ...item, editedBy: getContext(Global.USER)._id });
        if (!updatedItem) {
            throw new IdNotFoundError('itemId');
        }
        return PatcherService.itemPatcher(updatedItem as IItem) as Promise<IItem>;
    }

    static async increaseViewsAndPriority(itemId: string): Promise<IItem> {
        const updatedItem = await ItemRepository.increaseViewsAndPriority(itemId);
        if (!updatedItem) {
            throw new IdNotFoundError('itemId');
        }
        return updatedItem;
    }
}
