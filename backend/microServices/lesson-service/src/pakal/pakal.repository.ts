import { IPakal } from 'common-atom/interfaces/pakal.interface';
import { PakalModel } from 'shared-atom/models/pakal.model';

export class PakalRepository {
    // RPC & private routes
    static async getPakalById(pakalId: string): Promise<IPakal | null> {
        return PakalModel.findById(pakalId).exec();
    }

    // public routes
    static createPakal(pakal: IPakal, contentId?: string): Promise<IPakal> {
        return PakalModel.create({ ...(contentId && { _id: contentId }), ...pakal });
    }

    static updatePakal(pakalId: string, pakal: Partial<IPakal>): Promise<IPakal | null> {
        return PakalModel.findByIdAndUpdate(pakalId, pakal, { new: true }).exec();
    }
}
