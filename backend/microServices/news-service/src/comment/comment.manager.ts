import { IComment, ICommentUserless } from 'common-atom/interfaces/comment.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { getContext } from 'shared-atom/utils/helpers/context';
import { Global } from 'common-atom/enums/helpers/Global';
import { CommentRepository } from './comment.repository';
import { ArticleRepository } from '../article/article.repository';
import { WrongUserError } from './comment.errors';

export class CommentManager {
    static async createComment(articleId: string, comment: ICommentUserless): Promise<IComment> {
        const addedComment = await CommentRepository.createComment({
            user: getContext(Global.USER)._id,
            ...comment,
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await ArticleRepository.toggleComment(articleId, addedComment._id!);
        return addedComment;
    }

    static async deleteComment(articleId: string, commentId: string): Promise<IComment> {
        const comment = await CommentRepository.getCommentById(commentId);
        if (!comment) {
            throw new IdNotFoundError('commentId');
        }
        if (String(comment.user) !== getContext(Global.USER)._id) {
            throw new WrongUserError();
        }
        await CommentRepository.deleteComment(commentId);
        await ArticleRepository.toggleComment(articleId, commentId);
        return comment;
    }
}
