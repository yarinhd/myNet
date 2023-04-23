import { Request, Response } from 'express';
import { MyWikiManager } from './myWiki.manager';

export default class MyWikiController {
    static async getMyWiki(req: Request, res: Response): Promise<void> {
        res.json(await MyWikiManager.getMyWiki(req.query as any));
    }

    static async createMyWiki(req: Request, res: Response): Promise<void> {
        res.json(await MyWikiManager.createMyWiki(req.body));
    }

    static async updateMyWiki(req: Request, res: Response): Promise<void> {
        res.json(await MyWikiManager.updateMyWiki(req.params.myWikiId, req.body));
    }

    static async deleteMyWiki(req: Request, res: Response): Promise<void> {
        res.json(await MyWikiManager.deleteMyWiki(req.params.myWikiId));
    }
}
