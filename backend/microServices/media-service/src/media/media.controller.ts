import { Request, Response } from 'express';
import { MediaManager } from './media.manager';

export default class MediaController {
    static async createMedia(req: Request, res: Response): Promise<void> {
        res.json(await MediaManager.createMedia(req.body));
    }

    static async updateMedia(req: Request, res: Response): Promise<void> {
        res.json(await MediaManager.updateMedia(req.params.mediaId, req.body));
    }
}
