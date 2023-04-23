import { Request, Response } from 'express';
import { ChapterManager } from './chapter.manager';

export default class ChapterController {
    static async createChapter(req: Request, res: Response): Promise<void> {
        res.json(await ChapterManager.createChapter(req.params.contentType as string, req.body));
    }

    static async updateChapter(req: Request, res: Response): Promise<void> {
        res.json(await ChapterManager.updateChapter(req.params.chapterId, req.body));
    }
}
