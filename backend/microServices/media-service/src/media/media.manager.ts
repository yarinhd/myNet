/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ContentType } from '../../common/enums/ContentType';
import { IContentCreator } from '../../common/interfaces/content.interface';
import { IMedia } from '../../common/interfaces/media.interface';
import { IdNotFoundError } from '../../shared/utils/errors/validationError';
import { PatcherService } from '../../shared/utils/patcher/patcherService';
import { ItemRPCService } from '../../shared/utils/rpc/services/item.RPCservice';
import { MediaRepository } from './media.repository';

export class MediaManager {
    // RPC & private routes
    static async getMediaById(mediaId: string): Promise<IMedia> {
        const media = await MediaRepository.getMediaById(mediaId);
        if (!media) {
            throw new IdNotFoundError('mediaId');
        }
        return PatcherService.mediaPatcher(media as IMedia) as Promise<IMedia>;
    }

    // public routes
    static async createMedia(media: IContentCreator<IMedia>): Promise<IMedia> {
        const { content, item, contentId } = media;
        const createdMedia = await MediaRepository.createMedia(content, contentId);
        if (item) {
            await ItemRPCService.createItem({
                ...item,
                contentId: createdMedia._id!,
                contentType: media.content.video ? ContentType.VIDEO : ContentType.PODCAST,
            });
        }
        return PatcherService.mediaPatcher(createdMedia as IMedia) as Promise<IMedia>;
    }

    static async updateMedia(mediaId: string, media: Partial<IMedia>): Promise<IMedia> {
        const updatedMedia = await MediaRepository.updateMedia(mediaId, media);
        if (!updatedMedia) {
            throw new IdNotFoundError('mediaId');
        }
        return PatcherService.mediaPatcher(updatedMedia as IMedia) as Promise<IMedia>;
    }
}
