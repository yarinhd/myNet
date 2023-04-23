import { ILesson } from '../../common/interfaces/lesson.interface';
import { LessonModel } from '../../shared/models/lesson.model';

export class LessonRepository {
    // RPC & private routes
    static async getLessonById(lessonId: string): Promise<ILesson | null> {
        return LessonModel.findById(lessonId).exec();
    }

    // public routes
    static createLesson(lesson: ILesson, contentId?: string): Promise<ILesson> {
        return LessonModel.create({ ...(contentId && { _id: contentId }), ...lesson });
    }

    static updateLesson(lessonId: string, lesson: Partial<ILesson>): Promise<ILesson | null> {
        return LessonModel.findByIdAndUpdate(lessonId, lesson, { new: true }).exec();
    }
}
