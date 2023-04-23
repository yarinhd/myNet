import { Request, Response } from 'express';
import { MissionManager } from './mission.manager';

export default class MissionController {
    static async getMissions(req: Request, res: Response): Promise<void> {
        res.json(await MissionManager.getMissions(req.query as any));
    }

    static async createMission(req: Request, res: Response): Promise<void> {
        res.json(await MissionManager.createMission(req.body));
    }

    static async updateMission(req: Request, res: Response): Promise<void> {
        res.json(await MissionManager.updateMission(req.params.missionId, req.body));
    }

    static async deleteMission(req: Request, res: Response): Promise<void> {
        res.json(await MissionManager.deleteMission(req.params.missionId));
    }
}
