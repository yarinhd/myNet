import { Request, Response } from 'express';
import { LessonManager } from './lesson.manager';

export default class LessonController {
    static async createLesson(req: Request, res: Response): Promise<void> {
        res.json(await LessonManager.createLesson(req.body));
    }

    static async updateLesson(req: Request, res: Response): Promise<void> {
        res.json(await LessonManager.updateLesson(req.params.lessonId, req.body));
    }
}
