import { Request, Response } from 'express';
import { NewsManager } from './news.manager';

export default class NewsController {
    static async getNews(req: Request, res: Response): Promise<void> {
        res.json(await NewsManager.getNews(req.query as any));
    }

    static async createNews(req: Request, res: Response): Promise<void> {
        res.json(await NewsManager.createNews(req.body));
    }
}
