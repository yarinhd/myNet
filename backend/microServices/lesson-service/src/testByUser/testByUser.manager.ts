/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    ITestByUser,
    ITestByUserQuery,
    ITestResult,
    ITestUserAnswers,
} from 'common-atom/interfaces/testByUser.interface';
import { InvalidAnswersTestByUser } from 'shared-atom/utils/errors/validationError';
import { Global } from 'common-atom/enums/helpers/Global';
import { getContext } from 'shared-atom/utils/helpers/context';
import { TestByUserRepository } from './testByUser.repository';
import { TestManager } from '../test/test.manager';

export class TestByUserManager {
    static async getEmployeesTests(query: ITestByUserQuery): Promise<ITestResult[]> {
        return TestByUserRepository.getEmployeesTests(getContext(Global.USER), query);
    }

    static async createTestByUser(testByUser: ITestUserAnswers): Promise<ITestByUser> {
        const test = await TestManager.getTestById(testByUser.test);
        if (test.questions.length !== testByUser.answers.length) {
            throw new InvalidAnswersTestByUser();
        }

        return TestByUserRepository.createTestByUser({ user: getContext(Global.USER)._id, ...testByUser }, test);
    }
}
