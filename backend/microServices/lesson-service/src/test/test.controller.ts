import { Request, Response } from 'express';
import { TestManager } from './test.manager';

export default class TestController {
    static async createTest(req: Request, res: Response): Promise<void> {
        res.json(await TestManager.createTest(req.body));
    }

    static async updateTest(req: Request, res: Response): Promise<void> {
        res.json(await TestManager.updateTest(req.params.testId, req.body));
    }
}
