/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ContentType } from 'common-atom/enums/ContentType';
import { IContentCreator } from 'common-atom/interfaces/content.interface';
import { IMedia } from 'common-atom/interfaces/media.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { handleItemBlobCreation } from 'shared-atom/utils/schema/helpers/itemHelpers';
import { MediaRepository } from './media.repository';

export class MediaManager {
    // RPC & private routes
    static async getMediaById(mediaId: string): Promise<IMedia> {
        const media = await MediaRepository.getMediaById(mediaId);
        if (!media) {
            throw new IdNotFoundError('mediaId');
        }
        return media;
    }

    // public routes
    static async createMedia(media: IContentCreator<IMedia>): Promise<IMedia> {
        const { content, item, contentId } = media;
        const createdMedia = await MediaRepository.createMedia(content, contentId);
        if (item) {
            await handleItemBlobCreation(item);
            await ItemRPCService.createItem({
                ...item,
                contentId: createdMedia._id!,
                contentType: media.content.video ? ContentType.VIDEO : ContentType.PODCAST,
            });
        }
        return createdMedia;
    }

    static async updateMedia(mediaId: string, media: Partial<IMedia>): Promise<IMedia> {
        const updatedMedia = await MediaRepository.updateMedia(mediaId, media);
        if (!updatedMedia) {
            throw new IdNotFoundError('mediaId');
        }
        return updatedMedia;
    }
}
