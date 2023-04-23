import { ITest } from '../../common/interfaces/test.interface';
import { TestModel } from '../../shared/models/test.model';

export class TestRepository {
    static getTestById(testId: string): Promise<ITest | null> {
        return TestModel.findById(testId).exec();
    }

    static createTest(test: ITest): Promise<ITest> {
        return TestModel.create(test);
    }

    static updateTest(testId: string, test: Partial<ITest>): Promise<ITest | null> {
        return TestModel.findByIdAndUpdate(testId, test, { new: true }).exec();
    }
}
