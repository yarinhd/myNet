/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as mongoose from 'mongoose';
import { paginationKeys } from '../../common/interfaces/helpers/paginator.interface';
import { IItem } from '../../common/interfaces/item.interface';
import {
    ILastWatchedQuery,
    IUser,
    IUserAmountQuery,
    IUserChapterPatch,
    IUserMediaPatch,
    IUserQuery,
    IUserUpdater,
} from '../../common/interfaces/user.interface';
import { UserModel } from '../../shared/models/user.model';
import { paginationPipline } from '../../shared/utils/helpers/aggregation';
import { config } from '../config';

export class UserRepository {
    // RPC & private routes
    static async getUserById(userId: string): Promise<IUser | null> {
        return UserModel.findById(userId).exec();
    }

    static async addLastWatched(userId: string, itemId: string): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(
            userId,
            [
                {
                    $set: {
                        lastWatched: {
                            $cond: {
                                if: {
                                    $in: [mongoose.Types.ObjectId(itemId), '$lastWatched'],
                                },
                                then: {
                                    $concatArrays: [
                                        { $setDifference: ['$lastWatched', [mongoose.Types.ObjectId(itemId)]] },
                                        [mongoose.Types.ObjectId(itemId)],
                                    ],
                                },
                                else: {
                                    $concatArrays: ['$lastWatched', [mongoose.Types.ObjectId(itemId)]],
                                },
                            },
                        },
                    },
                },
            ],
            { new: true }
        ).exec();
    }

    // public routes
    static async getUsers(query: IUserQuery): Promise<IUser[]> {
        return (UserModel as any).aggregateSingleByCond(
            [
                ...(query.search
                    ? [
                          { $match: { $text: { $search: query.search } } },
                          { $set: { score: { $meta: 'textScore' } } },
                          { $sort: { score: -1 } },
                          { $unset: 'score' },
                      ]
                    : []),
                ...(query.permission ? [{ $match: { permission: query.permission } }] : []),
                ...paginationPipline(query.skip!, query.limit!),
            ],
            paginationKeys.some((key: keyof IUserQuery) => query[key] !== undefined)
        );
    }

    static async getLastWatched(userId: string, query: ILastWatchedQuery): Promise<IItem[]> {
        return UserModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(userId) } },
            { $unwind: '$lastWatched' },
            {
                $replaceRoot: {
                    newRoot: '$lastWatched',
                },
            },
            {
                $redact: {
                    $cond: [
                        {
                            $in: [mongoose.Types.ObjectId(query.area), '$areas'],
                        },
                        '$$KEEP',
                        '$$PRUNE',
                    ],
                },
            },
            { $redact: { $cond: [{ $in: [query.section, '$sections'] }, '$$KEEP', '$$PRUNE'] } },
            { $limit: config.lastWatched.queryLimit },
        ]).exec();
    }

    static async getAmountOfUsers(query?: IUserAmountQuery): Promise<number> {
        return UserModel.countDocuments(query ? { permission: query.permission } : {}).exec();
    }

    static createUser(user: IUser): Promise<IUser> {
        return UserModel.create(user);
    }

    static updateUser(userId: string, dataToUpdate: Partial<IUserUpdater>): Promise<IUser | null> {
        const { toggleEmployee, toggleFavorite, ...user } = dataToUpdate;
        return UserModel.findByIdAndUpdate(
            userId,
            [
                {
                    $set: {
                        ...user,
                        ...(toggleFavorite
                            ? [
                                  {
                                      favorites: {
                                          $cond: {
                                              if: {
                                                  $in: [mongoose.Types.ObjectId(toggleFavorite), '$favorites'],
                                              },
                                              then: {
                                                  $setDifference: [
                                                      '$favorites',
                                                      [mongoose.Types.ObjectId(toggleFavorite)],
                                                  ],
                                              },
                                              else: {
                                                  $concatArrays: [
                                                      '$favorites',
                                                      [mongoose.Types.ObjectId(toggleFavorite)],
                                                  ],
                                              },
                                          },
                                      },
                                  },
                              ]
                            : []),
                        ...(toggleEmployee
                            ? [
                                  {
                                      employees: {
                                          $cond: {
                                              if: {
                                                  $in: [mongoose.Types.ObjectId(toggleEmployee), '$employees'],
                                              },
                                              then: {
                                                  $setDifference: [
                                                      '$employees',
                                                      [mongoose.Types.ObjectId(toggleEmployee)],
                                                  ],
                                              },
                                              else: {
                                                  $concatArrays: [
                                                      '$employees',
                                                      [mongoose.Types.ObjectId(toggleEmployee)],
                                                  ],
                                              },
                                          },
                                      },
                                  },
                              ]
                            : []),
                    },
                },
            ],
            { new: true }
        ).exec();
    }

    static async patchChapter(userId: string, chapterId: string, body: IUserChapterPatch): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(
            userId,
            [
                {
                    $set: {
                        chapters: {
                            $cond: {
                                if: {
                                    $in: [
                                        mongoose.Types.ObjectId(chapterId),
                                        {
                                            $map: {
                                                input: '$chapters',
                                                as: 'singleChapter',
                                                in: '$$singleChapter.chapterId',
                                            },
                                        },
                                    ],
                                },
                                then: {
                                    $concatArrays: [
                                        {
                                            $filter: {
                                                input: '$chapters',
                                                as: 'singleChapter',
                                                cond: {
                                                    $ne: [
                                                        `$$singleChapter.chapterId`,
                                                        mongoose.Types.ObjectId(chapterId),
                                                    ],
                                                },
                                            },
                                        },
                                        [{ chapterId: mongoose.Types.ObjectId(chapterId), ...body }],
                                    ],
                                },
                                else: {
                                    $concatArrays: [
                                        '$chapters',
                                        [{ chapterId: mongoose.Types.ObjectId(chapterId), ...body }],
                                    ],
                                },
                            },
                        },
                    },
                },
            ],
            { new: true }
        ).exec();
    }

    static async patchMedia(userId: string, mediaId: string, body: IUserMediaPatch): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(
            userId,
            [
                {
                    $set: {
                        media: {
                            $cond: {
                                if: {
                                    $in: [
                                        mongoose.Types.ObjectId(mediaId),
                                        {
                                            $map: {
                                                input: '$media',
                                                as: 'singleMedia',
                                                in: '$$singleMedia.mediaId',
                                            },
                                        },
                                    ],
                                },
                                then: {
                                    $concatArrays: [
                                        {
                                            $filter: {
                                                input: '$media',
                                                as: 'singleMedia',
                                                cond: {
                                                    $ne: [`$$singleMedia.mediaId`, mongoose.Types.ObjectId(mediaId)],
                                                },
                                            },
                                        },
                                        [{ mediaId: mongoose.Types.ObjectId(mediaId), ...body }],
                                    ],
                                },
                                else: {
                                    $concatArrays: ['$media', [{ mediaId: mongoose.Types.ObjectId(mediaId), ...body }]],
                                },
                            },
                        },
                    },
                },
            ],
            { new: true }
        ).exec();
    }
}
