import { Request, Response } from 'express';
import { UnitManager } from './unit.manager';

export default class UnitController {
    static async getUnits(req: Request, res: Response): Promise<void> {
        res.json(await UnitManager.getUnits());
    }

    static async createUnit(req: Request, res: Response): Promise<void> {
        res.json(await UnitManager.createUnit(req.body));
    }

    static async updateUnit(req: Request, res: Response): Promise<void> {
        res.json(await UnitManager.updateUnit(req.params.unitId, req.body));
    }
}
