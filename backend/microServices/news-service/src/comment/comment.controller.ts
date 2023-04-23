import { Request, Response } from 'express';
import { CommentManager } from './comment.manager';

export default class CommentController {
    static async createComment(req: Request, res: Response): Promise<void> {
        res.json(await CommentManager.createComment(req.params.articleId, req.body));
    }

    static async deleteComment(req: Request, res: Response): Promise<void> {
        res.json(await CommentManager.deleteComment(req.params.articleId, req.params.commentId));
    }
}
