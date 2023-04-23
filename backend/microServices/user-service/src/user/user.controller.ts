import { Request, Response } from 'express';
import { UserManager } from './user.manager';

export default class UserController {
    static async getUsers(req: Request, res: Response): Promise<void> {
        res.json(await UserManager.getUsers(req.query as any));
    }

    static async getLastWatched(req: Request, res: Response): Promise<void> {
        res.json(await UserManager.getLastWatched(req.query as any));
    }

    static async getAmountOfUsers(req: Request, res: Response): Promise<void> {
        res.json(await UserManager.getAmountOfUsers(req.query as any));
    }

    static async createUser(req: Request, res: Response): Promise<void> {
        res.json(await UserManager.createUser(req.body));
    }

    static async updateUser(req: Request, res: Response): Promise<void> {
        res.json(await UserManager.updateUser(req.params.userId, req.body));
    }

    static async patchRelevantArea(req: Request, res: Response): Promise<void> {
        res.json(await UserManager.patchRelevantArea(req.body));
    }

    static async patchChapter(req: Request, res: Response): Promise<void> {
        res.json(await UserManager.patchChapter(req.params.chapterId, req.body));
    }

    static async patchMedia(req: Request, res: Response): Promise<void> {
        res.json(await UserManager.patchMedia(req.params.mediaId, req.body));
    }
}
