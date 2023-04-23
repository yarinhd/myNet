import { IArea } from '../../common/interfaces/area.interface';
import { AreaModel } from '../../shared/models/area.model';

export class AreaRepository {
    // RPC & private routes
    static getAreaById(areaId: string): Promise<IArea | null> {
        return AreaModel.findById(areaId).exec();
    }

    // public routes
    static getAreas(): Promise<IArea[]> {
        return AreaModel.find().exec();
    }

    static createArea(area: IArea): Promise<IArea> {
        return AreaModel.create(area);
    }

    static updateArea(areaId: string, area: Partial<IArea>): Promise<IArea | null> {
        return AreaModel.findByIdAndUpdate(areaId, area, { new: true }).exec();
    }
}
