/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ContentType } from 'common-atom/enums/ContentType';
import { IContentCreator } from 'common-atom/interfaces/content.interface';
import { IInfographic } from 'common-atom/interfaces/infographic.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { ItemRPCService } from 'shared-atom/utils/rpc/services/item.RPCservice';
import { handleItemBlobCreation } from 'shared-atom/utils/schema/helpers/itemHelpers';
import { InfographicRepository } from './infographic.repository';

export class InfographicManager {
    // RPC & private routes
    static async getInfographicById(infographicId: string): Promise<IInfographic> {
        const Infographic = await InfographicRepository.getInfographicById(infographicId);
        if (!Infographic) {
            throw new IdNotFoundError('infographicId');
        }
        return Infographic;
    }

    // public routes
    static async createInfographic(infographic: IContentCreator<IInfographic>): Promise<IInfographic> {
        const { content, item, contentId } = infographic;
        const createdInfographic = await InfographicRepository.createInfographic(content, contentId);
        if (item) {
            await handleItemBlobCreation(item);
            await ItemRPCService.createItem({
                ...item,
                contentId: createdInfographic._id!,
                contentType: ContentType.INFOGRAPHIC,
            });
        }
        return createdInfographic;
    }

    static async updateInfographic(infographicId: string, infographic: Partial<IInfographic>): Promise<IInfographic> {
        const updatedInfographic = await InfographicRepository.updateInfographic(infographicId, infographic);
        if (!updatedInfographic) {
            throw new IdNotFoundError('infographicId');
        }
        return updatedInfographic;
    }
}
