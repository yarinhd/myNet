import { IArticle, IArticleGroup, IArticleQuery } from '../../common/interfaces/article.interface';
import { ArticleRepository } from './article.repository';
import { IdNotFoundError } from '../../shared/utils/errors/validationError';

export class ArticleManager {
    // RPC & private routes
    static async getArticleById(articleId: string): Promise<IArticle> {
        const article = await ArticleRepository.getArticleById(articleId);
        if (!article) {
            throw new IdNotFoundError('articleId');
        }
        return article;
    }

    // public routes
    static async getArticles(query: IArticleQuery): Promise<IArticle[] | IArticleGroup[]> {
        return ArticleRepository.getArticles(query);
    }

    static async createArticle(article: IArticle): Promise<IArticle> {
        return ArticleRepository.createArticle(article);
    }

    static async updateArticle(articleId: string, article: Partial<IArticle>): Promise<IArticle> {
        const updatedArticle = await ArticleRepository.updateArticle(articleId, article);
        if (!updatedArticle) {
            throw new IdNotFoundError('articleId');
        }
        return updatedArticle;
    }
}
