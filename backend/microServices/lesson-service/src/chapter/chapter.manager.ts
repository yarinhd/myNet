import { ContentType } from '../../common/enums/ContentType';
import { ChapterDescriptionError } from './chapter.errors';
import { IChapter } from '../../common/interfaces/chapter.interface';
import { ChapterRepository } from './chapter.repository';
import { IdNotFoundError } from '../../shared/utils/errors/validationError';
import { PatcherService } from '../../shared/utils/patcher/patcherService';

export class ChapterManager {
    // RPC & private routes
    static async getChapterById(chapterId: string): Promise<IChapter> {
        const chapter = await ChapterRepository.getChapterById(chapterId);
        if (!chapter) {
            throw new IdNotFoundError('chapterId');
        }
        return PatcherService.chapterPatcher(chapter as IChapter) as Promise<IChapter>;
    }

    // public routes
    static async createChapter(contentType: string, chapter: IChapter): Promise<IChapter> {
        if (contentType === ContentType.LESSON && !chapter.description) {
            throw new ChapterDescriptionError();
        }
        const createdChapter = await ChapterRepository.createChapter(chapter);
        return PatcherService.chapterPatcher(createdChapter as IChapter) as Promise<IChapter>;
    }

    static async updateChapter(chapterId: string, chapter: Partial<IChapter>): Promise<IChapter> {
        const updatedChapter = await ChapterRepository.updateChapter(chapterId, chapter);
        if (!updatedChapter) {
            throw new IdNotFoundError('chapterId');
        }
        return PatcherService.chapterPatcher(updatedChapter as IChapter) as Promise<IChapter>;
    }
}
