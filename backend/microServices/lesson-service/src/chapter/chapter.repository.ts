import { IChapter } from 'common-atom/interfaces/chapter.interface';
import { ChapterModel } from 'shared-atom/models/chapter.model';

export class ChapterRepository {
    // RPC & private routes
    static getChapterById(chapterId: string): Promise<IChapter | null> {
        return ChapterModel.findById(chapterId).exec();
    }

    // public routes
    static createChapter(chapter: IChapter): Promise<IChapter> {
        return ChapterModel.create(chapter);
    }

    static updateChapter(chapterId: string, chapter: Partial<IChapter>): Promise<IChapter | null> {
        return ChapterModel.findByIdAndUpdate(chapterId, chapter, { new: true }).exec();
    }
}
