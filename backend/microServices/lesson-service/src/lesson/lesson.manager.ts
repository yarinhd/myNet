/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ILesson } from 'common-atom/interfaces/lesson.interface';
import { IContentCreator } from 'common-atom/interfaces/content.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { ContentType } from 'common-atom/enums/ContentType';
import { handleItemBlobCreation } from 'shared-atom/utils/schema/helpers/itemHelpers';
import { LessonRepository } from './lesson.repository';

export class LessonManager {
    // RPC & private routes
    static async getLessonById(lessonId: string): Promise<ILesson> {
        const lesson = await LessonRepository.getLessonById(lessonId);
        if (!lesson) {
            throw new IdNotFoundError('lessonId');
        }
        return lesson;
    }

    // public routes
    static async createLesson(lesson: IContentCreator<ILesson>): Promise<ILesson> {
        const { content, item, contentId } = lesson;
        const createdLesson = await LessonRepository.createLesson(content, contentId);
        if (item) {
            await handleItemBlobCreation(item);
            await ItemRPCService.createItem({
                ...item,
                contentId: createdLesson._id!,
                contentType: ContentType.LESSON,
            });
        }
        return createdLesson;
    }

    static async updateLesson(lessonId: string, lesson: Partial<ILesson>): Promise<ILesson> {
        const updatedLesson = await LessonRepository.updateLesson(lessonId, lesson);
        if (!updatedLesson) {
            throw new IdNotFoundError('lessonId');
        }
        return updatedLesson;
    }
}
