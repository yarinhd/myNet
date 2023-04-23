import { ContentType } from 'common-atom/enums/ContentType';
import { IChapter } from 'common-atom/interfaces/chapter.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { ChapterDescriptionError } from './chapter.errors';
import { ChapterRepository } from './chapter.repository';

export class ChapterManager {
    // RPC & private routes
    static async getChapterById(chapterId: string): Promise<IChapter> {
        const chapter = await ChapterRepository.getChapterById(chapterId);
        if (!chapter) {
            throw new IdNotFoundError('chapterId');
        }
        return chapter;
    }

    // public routes
    static async createChapter(contentType: string, chapter: IChapter): Promise<IChapter> {
        if (contentType === ContentType.LESSON && !chapter.description) {
            throw new ChapterDescriptionError();
        }
        return ChapterRepository.createChapter(chapter);
    }

    static async updateChapter(chapterId: string, chapter: Partial<IChapter>): Promise<IChapter> {
        const updatedChapter = await ChapterRepository.updateChapter(chapterId, chapter);
        if (!updatedChapter) {
            throw new IdNotFoundError('chapterId');
        }
        return updatedChapter;
    }
}
