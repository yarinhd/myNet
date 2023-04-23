/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as mongoose from 'mongoose';
import { IPaginator, paginationKeys } from 'common-atom/interfaces/helpers/paginator.interface';
import { IItem, IItemQuery, IMissionItem } from 'common-atom/interfaces/item.interface';
import { ItemModel } from 'shared-atom/models/item.model';
import { paginationPipline } from 'shared-atom/utils/helpers/aggregation';
import { UsersRPCService } from 'shared-atom/utils/rpc/services/user.RPCservice';

export class ItemRepository {
    // RPC & private routes
    static getItemById(itemId: string): Promise<IItem | null> {
        return ItemModel.findById(itemId).exec();
    }

    static getItemByContentId(contentId: string): Promise<IItem | null> {
        return ItemModel.findOne({ contentId }).exec();
    }

    // public routes
    static async getItems(query: IItemQuery): Promise<IItem[] | IPaginator<IItem>> {
        return (ItemModel as any).aggregateSingleByCond(
            [
                ...(query.search
                    ? [
                          { $match: { $text: { $search: query.search } } },
                          { $set: { score: { $meta: 'textScore' } } },
                          { $sort: { score: -1, priority: -1 } },
                          { $unset: 'score' },
                      ]
                    : [{ $sort: { priority: -1 } }]),
                {
                    $redact: {
                        $cond: [
                            {
                                $in: [
                                    mongoose.Types.ObjectId(query.areaId),
                                    {
                                        $map: {
                                            input: '$areas',
                                            as: 'singleArea',
                                            in: '$$singleArea._id',
                                        },
                                    },
                                ],
                            },
                            '$$KEEP',
                            '$$PRUNE',
                        ],
                    },
                },
                ...(query.sections ? [{ $match: { sections: { $in: query.sections } } }] : []),
                ...(query.contentType ? [{ $match: { contentType: query.contentType } }] : []),
                ...(query.categories
                    ? [
                          { $match: { categories: { $in: query.categories } } },
                          ...paginationPipline(query.skip!, query.limit!),
                      ]
                    : [
                          { $unwind: '$categories' },
                          { $group: { _id: '$categories', items: { $push: '$$ROOT' } } },
                          {
                              $project: {
                                  category: '$_id',
                                  items: { $slice: ['$items', 0, 5] },
                                  _id: 0,
                              },
                          },
                          { $unwind: '$items' },
                          { $group: { _id: null, items: { $push: '$items' } } },
                          { $project: { _id: 0, items: 1 } },
                          { $unwind: '$items' },
                          { $replaceRoot: { newRoot: '$items' } },
                      ]),
            ],
            paginationKeys.some((key: keyof IItemQuery) => query[key] !== undefined)
        );
    }

    static createItem(item: IItem | IMissionItem): Promise<IItem> {
        return ItemModel.create(item);
    }

    static updateItem(itemId: string, item: Partial<IItem>): Promise<IItem | null> {
        return ItemModel.findByIdAndUpdate(itemId, item, { new: true }).exec();
    }

    static async increaseViewsAndPriority(itemId: string): Promise<IItem | null> {
        const numOfUsers = await UsersRPCService.getAmountOfUsers();

        return ItemModel.findByIdAndUpdate(
            itemId,
            [
                {
                    $set: {
                        views: { $sum: ['$views', 1] },
                        priority: {
                            $max: [
                                '$priority',
                                {
                                    $min: [
                                        {
                                            $ceil: {
                                                $multiply: [{ $divide: ['$views', numOfUsers] }, 100],
                                            },
                                        },
                                        100,
                                    ],
                                },
                            ],
                        },
                    },
                },
            ],
            { new: true }
        ).exec();
    }

    static decreaseAllPriorities(): Promise<mongoose.UpdateWriteOpResult> {
        return ItemModel.updateMany(
            {},
            [
                {
                    $set: {
                        priority: { $max: [{ $sum: ['$priority', -1] }, 1] },
                    },
                },
            ],
            { new: true }
        ).exec();
    }
}
