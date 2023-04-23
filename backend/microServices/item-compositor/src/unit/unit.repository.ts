import { IUnit } from 'common-atom/interfaces/unit.interface';
import { UnitModel } from 'shared-atom/models/unit.model';

export class UnitRepository {
    // RPC & private routes
    static getUnitById(unitId: string): Promise<IUnit | null> {
        return UnitModel.findById(unitId).exec();
    }

    // public routes
    static getUnits(): Promise<IUnit[]> {
        return UnitModel.find().exec();
    }

    static createUnit(unit: IUnit): Promise<IUnit> {
        return UnitModel.create(unit);
    }

    static updateUnit(unitId: string, unit: Partial<IUnit>): Promise<IUnit | null> {
        return UnitModel.findByIdAndUpdate(unitId, unit, { new: true }).exec();
    }
}
