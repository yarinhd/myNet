import { Request, Response } from 'express';
import { ContentManager } from './content.manager';

export default class ContentController {
    static async getContentById(req: Request, res: Response): Promise<void> {
        res.json(await ContentManager.getContentById(req.query as any));
    }
}
