import { Request, Response } from 'express';
import { ArticleManager } from './article.manager';

export default class ArticleController {
    static async getArticles(req: Request, res: Response): Promise<void> {
        res.json(await ArticleManager.getArticles(req.query));
    }

    static async createArticle(req: Request, res: Response): Promise<void> {
        res.json(await ArticleManager.createArticle(req.body));
    }

    static async updateArticle(req: Request, res: Response): Promise<void> {
        res.json(await ArticleManager.updateArticle(req.params.articleId, req.body));
    }
}
