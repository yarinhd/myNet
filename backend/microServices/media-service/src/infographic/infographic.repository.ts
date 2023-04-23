import { IInfographic } from '../../common/interfaces/infographic.interface';
import { InfographicModel } from '../../shared/models/infographic.model';

export class InfographicRepository {
    // RPC & private routes
    static async getInfographicById(infographicId: string): Promise<IInfographic | null> {
        return InfographicModel.findById(infographicId).exec();
    }

    // public routes
    static createInfographic(infographic: IInfographic, contentId?: string): Promise<IInfographic> {
        return InfographicModel.create({ ...(contentId && { _id: contentId }), ...infographic });
    }

    static updateInfographic(infographicId: string, infographic: Partial<IInfographic>): Promise<IInfographic | null> {
        return InfographicModel.findByIdAndUpdate(infographicId, infographic, { new: true }).exec();
    }
}
