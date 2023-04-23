import { Request, Response } from 'express';
import { AreaManager } from './area.manager';

export default class AreaController {
    static async getAreas(req: Request, res: Response): Promise<void> {
        res.json(await AreaManager.getAreas());
    }

    static async createArea(req: Request, res: Response): Promise<void> {
        res.json(await AreaManager.createArea(req.body));
    }

    static async updateArea(req: Request, res: Response): Promise<void> {
        res.json(await AreaManager.updateArea(req.params.areaId, req.body));
    }
}
