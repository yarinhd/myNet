import { ITest } from 'common-atom/interfaces/test.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { TestRepository } from './test.repository';

export class TestManager {
    static async getTestById(testId: string): Promise<ITest> {
        const test = await TestRepository.getTestById(testId);
        if (!test) {
            throw new IdNotFoundError('testId');
        }
        return test;
    }

    static async createTest(test: ITest): Promise<ITest> {
        return TestRepository.createTest(test);
    }

    static async updateTest(testId: string, test: Partial<ITest>): Promise<ITest> {
        const updatedTest = await TestRepository.updateTest(testId, test);
        if (!updatedTest) {
            throw new IdNotFoundError('testId');
        }
        return updatedTest;
    }
}
