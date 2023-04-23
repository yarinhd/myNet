import * as mongoose from 'mongoose';
import { WatchMode } from 'common-atom/enums/WatchMode';
import { IMission, IMissionQuery, IMissionGroup } from 'common-atom/interfaces/mission.interface';
import { MissionModel } from 'shared-atom/models/mission.model';

export class MissionRepository {
    static async getMissions(query: IMissionQuery): Promise<IMission[] | IMissionGroup> {
        const { startDate, endDate, editor } = query;
        return (MissionModel as any).aggregateSingleByCond(
            [
                {
                    $match: {
                        $nor: [
                            {
                                $and: [{ startDate: { $lt: startDate } }, { complitionDate: { $lt: startDate } }],
                            },
                            {
                                $and: [{ startDate: { $gt: endDate } }, { complitionDate: { $gt: endDate } }],
                            },
                        ],
                    },
                },
                { $sort: { createdAt: -1 } },
                ...(editor
                    ? [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ['$editor._id', mongoose.Types.ObjectId(editor)],
                                  },
                              },
                          },
                      ]
                    : [
                          {
                              $facet: {
                                  metadata1: [{ $count: 'totalMissions' }],
                                  metadata2: [
                                      { $match: { status: WatchMode.COMPLETE } },
                                      { $count: 'totalCompletedMissions' },
                                  ],
                                  data: [
                                      { $group: { _id: '$editor._id', missions: { $push: '$$ROOT' } } },
                                      {
                                          $lookup: {
                                              from: 'users',
                                              localField: '_id',
                                              foreignField: '_id',
                                              as: 'user',
                                          },
                                      },
                                      { $project: { _id: 0, user: { $arrayElemAt: ['$user', 0] }, missions: 1 } },
                                      { $sort: { '$user.firstName': -1 } },
                                  ],
                              },
                          },
                          {
                              $addFields: {
                                  metadata: {
                                      $mergeObjects: [
                                          {
                                              $ifNull: [
                                                  { $arrayElemAt: ['$metadata1', 0] },
                                                  { totalMissions: { $toInt: 0 } },
                                              ],
                                          },
                                          {
                                              $ifNull: [
                                                  { $arrayElemAt: ['$metadata2', 0] },
                                                  { totalCompleteMissions: { $toInt: 0 } },
                                              ],
                                          },
                                      ],
                                  },
                              },
                          },
                          { $unset: ['metadata1', 'metadata2'] },
                      ]),
            ],
            !editor
        );
    }

    static createMission(mission: IMission): Promise<IMission> {
        return MissionModel.create(mission);
    }

    static updateMission(missionId: string, mission: Partial<IMission>): Promise<IMission | null> {
        return MissionModel.findByIdAndUpdate(missionId, mission, { new: true }).exec();
    }

    static deleteMission(missionId: string): Promise<IMission | null> {
        return MissionModel.remove({ _id: missionId }).exec();
    }
}
