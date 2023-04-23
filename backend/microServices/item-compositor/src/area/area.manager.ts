import * as turf from '@turf/turf';
import { IArea } from 'common-atom/interfaces/area.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { AreaRepository } from './area.repository';

export class AreaManager {
    // RPC & private routes
    static async getAreaById(areaId: string): Promise<IArea> {
        const area = await AreaRepository.getAreaById(areaId);
        if (!area) {
            throw new IdNotFoundError('areaId');
        }
        return area;
    }

    static async getRelevantArea(coordinate: number[]): Promise<IArea | undefined> {
        const point = turf.point(coordinate);
        const relevantArea = (await AreaManager.getAreas()).find((area: IArea) => {
            const polygon = turf.polygon([area.polygon]);
            return turf.booleanPointInPolygon(point, polygon);
        });
        return relevantArea;
    }

    // public routes
    static async getAreas(): Promise<IArea[]> {
        return AreaRepository.getAreas();
    }

    static async createArea(area: IArea): Promise<IArea> {
        return AreaRepository.createArea(area);
    }

    static async updateArea(areaId: string, area: Partial<IArea>): Promise<IArea> {
        const updatedArea = await AreaRepository.updateArea(areaId, area);
        if (!updatedArea) {
            throw new IdNotFoundError('areaId');
        }
        return updatedArea;
    }
}
