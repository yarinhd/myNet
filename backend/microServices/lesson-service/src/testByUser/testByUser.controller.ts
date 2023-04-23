import { Request, Response } from 'express';
import { TestByUserManager } from './testByUser.manager';

export default class TestController {
    static async getEmployeesTests(req: Request, res: Response): Promise<void> {
        res.json(await TestByUserManager.getEmployeesTests(req.query));
    }

    static async createTestByUser(req: Request, res: Response): Promise<void> {
        res.json(await TestByUserManager.createTestByUser(req.body));
    }
}
