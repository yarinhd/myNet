import { IUnit } from '../../common/interfaces/unit.interface';
import { IdNotFoundError } from '../../shared/utils/errors/validationError';
import { UnitRepository } from './unit.repository';

export class UnitManager {
    // RPC & private routes
    static async getUnitById(unitId: string): Promise<IUnit> {
        const unit = await UnitRepository.getUnitById(unitId);
        if (!unit) {
            throw new IdNotFoundError('unitId');
        }
        return unit;
    }

    // public routes
    static async getUnits(): Promise<IUnit[]> {
        return UnitRepository.getUnits();
    }

    static async createUnit(unit: IUnit): Promise<IUnit> {
        return UnitRepository.createUnit(unit);
    }

    static async updateUnit(unitId: string, unit: Partial<IUnit>): Promise<IUnit> {
        const updatedUnit = await UnitRepository.updateUnit(unitId, unit);
        if (!updatedUnit) {
            throw new IdNotFoundError('unitId');
        }
        return updatedUnit;
    }
}
