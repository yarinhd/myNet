import { IComment } from '../../common/interfaces/comment.interface';
import { CommentModel } from '../../shared/models/comment.model';

export class CommentRepository {
    // RPC & private routes
    static getCommentById(commentId: string): Promise<IComment | null> {
        return CommentModel.findById(commentId).exec();
    }

    // public routes
    static createComment(comment: IComment): Promise<IComment> {
        return CommentModel.create(comment);
    }

    static deleteComment(commentId: string): Promise<IComment | null> {
        return CommentModel.remove({ _id: commentId }).exec();
    }
}
