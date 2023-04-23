import { IMedia } from '../../common/interfaces/media.interface';
import { MediaModel } from '../../shared/models/media.model';

export class MediaRepository {
    // RPC & private routes
    static async getMediaById(mediaId: string): Promise<IMedia | null> {
        return MediaModel.findById(mediaId).exec();
    }

    // public routes
    static createMedia(media: IMedia, contentId?: string): Promise<IMedia> {
        return MediaModel.create({ ...(contentId && { _id: contentId }), ...media });
    }

    static updateMedia(mediaId: string, media: Partial<IMedia>): Promise<IMedia | null> {
        return MediaModel.findByIdAndUpdate(mediaId, media, { new: true }).exec();
    }
}
