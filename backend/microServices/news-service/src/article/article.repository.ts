import * as mongoose from 'mongoose';
import { IArticle, IArticleGroup, IArticleQuery } from 'common-atom/interfaces/article.interface';
import { ArticleModel } from 'shared-atom/models/article.model';

export class ArticleRepository {
    // RPC & private routes
    static getArticleById(articleId: string): Promise<IArticle | null> {
        return ArticleModel.findById(articleId).exec();
    }

    static toggleComment(articleId: string, commentId: string): Promise<IArticle | null> {
        return ArticleModel.findByIdAndUpdate(
            articleId,
            [
                {
                    $set: {
                        comments: {
                            $cond: {
                                if: {
                                    $in: [mongoose.Types.ObjectId(commentId), '$comments'],
                                },
                                then: {
                                    $setDifference: ['$comments', [mongoose.Types.ObjectId(commentId)]],
                                },
                                else: {
                                    $concatArrays: ['$comments', [mongoose.Types.ObjectId(commentId)]],
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
    static getArticles(query: IArticleQuery): Promise<IArticle[] | IArticleGroup[]> {
        return ArticleModel.aggregate([
            ...(query.category
                ? [{ $match: { category: query.category } }]
                : [
                      { $group: { _id: '$category', articles: { $push: '$$ROOT' } } },
                      { $project: { _id: 0, category: { $arrayElemAt: ['$_id', 0] }, articles: 1 } },
                      { $sort: { category: -1 } },
                  ]),
        ]).exec();
    }

    static createArticle(article: IArticle): Promise<IArticle> {
        return ArticleModel.create(article);
    }

    static updateArticle(articleId: string, article: Partial<IArticle>): Promise<IArticle | null> {
        return ArticleModel.findByIdAndUpdate(articleId, article, { new: true }).exec();
    }
}
