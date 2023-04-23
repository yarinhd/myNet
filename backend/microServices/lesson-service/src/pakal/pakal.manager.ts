/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IPakal } from '../../common/interfaces/pakal.interface';
import { PakalRepository } from './pakal.repository';
import { IdNotFoundError } from '../../shared/utils/errors/validationError';
import { IContentCreator } from '../../common/interfaces/content.interface';
import { ItemRPCService } from '../../shared/utils/rpc/services/item.RPCservice';
import { ContentType } from '../../common/enums/ContentType';

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
