import { Request, Response } from 'express';
import { PakalManager } from './pakal.manager';

export default class PakalController {
    static async createPakal(req: Request, res: Response): Promise<void> {
        res.json(await PakalManager.createPakal(req.body));
    }

    static async updatePakal(req: Request, res: Response): Promise<void> {
        res.json(await PakalManager.updatePakal(req.params.pakalId, req.body));
    }
}
