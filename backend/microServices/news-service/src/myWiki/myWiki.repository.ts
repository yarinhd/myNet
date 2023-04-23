/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IPaginator, paginationKeys } from '../../common/interfaces/helpers/paginator.interface';
import { IMyWiki, IMyWikiQuery } from '../../common/interfaces/myWiki.interface';
import { MyWikiModel } from '../../shared/models/myWiki.model';
import { paginationPipline } from '../../shared/utils/helpers/aggregation';

const TYPE_CHARACTER = 1;

export class MyWikiRepository {
    static getMyWiki(query: IMyWikiQuery): Promise<IMyWiki[] | IPaginator<IMyWiki>> {
        return (MyWikiModel as any).aggregateSingleByCond(
            [
                ...(query.search
                    ? [
                          ...(query.search.length === TYPE_CHARACTER
                              ? [
                                    { $match: { word: { $regex: `^${query.search}.*$`, $options: 'i' } } },
                                    { $sort: { word: -1 } },
                                ]
                              : [
                                    { $match: { $text: { $search: query.search } } },
                                    { $set: { score: { $meta: 'textScore' } } },
                                    { $sort: { score: -1 } },
                                    { $unset: 'score' },
                                ]),
                      ]
                    : [{ $sort: { word: -1 } }]),
                ...paginationPipline(query.skip!, query.limit!),
            ],
            paginationKeys.some((key: keyof IMyWikiQuery) => query[key] !== undefined)
        );
    }

    static createMyWiki(myWiki: IMyWiki): Promise<IMyWiki> {
        return MyWikiModel.create(myWiki);
    }

    static updateMyWiki(myWikiId: string, myWiki: Partial<IMyWiki>): Promise<IMyWiki | null> {
        return MyWikiModel.findByIdAndUpdate(myWikiId, myWiki, { new: true }).exec();
    }

    static deleteMyWiki(myWikiId: string): Promise<IMyWiki | null> {
        return MyWikiModel.remove({ _id: myWikiId }).exec();
    }
}
