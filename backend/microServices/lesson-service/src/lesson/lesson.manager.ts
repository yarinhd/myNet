/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ILesson } from '../../common/interfaces/lesson.interface';
import { IContentCreator } from '../../common/interfaces/content.interface';
import { LessonRepository } from './lesson.repository';
import { IdNotFoundError } from '../../shared/utils/errors/validationError';
import { PatcherService } from '../../shared/utils/patcher/patcherService';
import { ItemRPCService } from '../../shared/utils/rpc/services/item.RPCservice';
import { ContentType } from '../../shared/common/enums/ContentType';

export class LessonManager {
    // RPC & private routes
    static async getLessonById(lessonId: string): Promise<ILesson> {
        const lesson = await LessonRepository.getLessonById(lessonId);
        if (!lesson) {
            throw new IdNotFoundError('lessonId');
        }
        return PatcherService.lessonPatcher(lesson as ILesson) as Promise<ILesson>;
    }

    // public routes
    static async createLesson(lesson: IContentCreator<ILesson>): Promise<ILesson> {
        const { content, item, contentId } = lesson;
        const createdLesson = await LessonRepository.createLesson(content, contentId);
        if (item) {
            await ItemRPCService.createItem({
                ...item,
                contentId: createdLesson._id!,
                contentType: ContentType.LESSON,
            });
        }
        return PatcherService.lessonPatcher(createdLesson as ILesson) as Promise<ILesson>;
    }

    static async updateLesson(lessonId: string, lesson: Partial<ILesson>): Promise<ILesson> {
        const updatedLesson = await LessonRepository.updateLesson(lessonId, lesson);
        if (!updatedLesson) {
            throw new IdNotFoundError('lessonId');
        }
        return PatcherService.lessonPatcher(updatedLesson as ILesson) as Promise<ILesson>;
    }
}
