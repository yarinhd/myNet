/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IPakal } from 'common-atom/interfaces/pakal.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { IContentCreator } from 'common-atom/interfaces/content.interface';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { ContentType } from 'common-atom/enums/ContentType';
import { handleItemBlobCreation } from 'shared-atom/utils/schema/helpers/itemHelpers';
import { PakalRepository } from './pakal.repository';

export class PakalManager {
    // RPC & private routes
    static async getPakalById(pakalId: string): Promise<IPakal> {
        const pakal = await PakalRepository.getPakalById(pakalId);
        if (!pakal) {
            throw new IdNotFoundError('pakalId');
        }
        return pakal;
    }

    // public routes
    static async createPakal(pakal: IContentCreator<IPakal>): Promise<IPakal> {
        const { content, item, contentId } = pakal;
        const createdPakal = await PakalRepository.createPakal(content, contentId);
        if (item) {
            await handleItemBlobCreation(item);
            await ItemRPCService.createItem({ ...item, contentId: createdPakal._id!, contentType: ContentType.PAKAL });
        }
        return createdPakal;
    }

    static async updatePakal(pakalId: string, pakal: Partial<IPakal>): Promise<IPakal> {
        const updatedPakal = await PakalRepository.updatePakal(pakalId, pakal);
        if (!updatedPakal) {
            throw new IdNotFoundError('pakalId');
        }
        return updatedPakal;
    }
}
