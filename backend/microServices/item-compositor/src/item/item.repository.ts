/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as mongoose from 'mongoose';
import { IPaginator, paginationKeys } from '../../common/interfaces/helpers/paginator.interface';
import { IItem, IItemGroup, IItemQuery, IMissionItem } from '../../common/interfaces/item.interface';
import { ItemModel } from '../../shared/models/item.model';
import { paginationPipline } from '../../shared/utils/helpers/aggregation';
import { UsersRPCService } from '../../shared/utils/rpc/services/user.RPCservice';

export class ItemRepository {
    // RPC & private routes
    static getItemById(itemId: string): Promise<IItem | null> {
        return ItemModel.findById(itemId).exec();
    }

    static getItemByContentId(contentId: string): Promise<IItem | null> {
        return ItemModel.findOne({ contentId }).exec();
    }

    // public routes
    static async getItems(query: IItemQuery): Promise<IItem[] | IItemGroup[] | IPaginator<IItem>> {
        return (ItemModel as any).aggregateSingleByCond(
            query.search
                ? [
                      { $match: { $text: { $search: query.search } } },
                      { $set: { score: { $meta: 'textScore' } } },
                      { $sort: { score: -1, priority: -1 } },
                      { $unset: 'score' },
                      ...paginationPipline(query.skip!, query.limit!),
                  ]
                : [
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
                      { $redact: { $cond: [{ $in: [query.section, '$sections'] }, '$$KEEP', '$$PRUNE'] } },
                      { $sort: { priority: -1 } },
                      ...(query.contentType ? [{ $match: { contentType: query.contentType } }] : []),
                      ...(query.category
                          ? [
                                { $redact: { $cond: [{ $in: [query.category, '$categories'] }, '$$KEEP', '$$PRUNE'] } },
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
