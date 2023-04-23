import { Request, Response } from 'express';
import { InfographicManager } from './infographic.manager';

export default class InfographicController {
    static async createInfographic(req: Request, res: Response): Promise<void> {
        res.json(await InfographicManager.createInfographic(req.body));
    }

    static async updateInfographic(req: Request, res: Response): Promise<void> {
        res.json(await InfographicManager.updateInfographic(req.params.infographicId, req.body));
    }
}
