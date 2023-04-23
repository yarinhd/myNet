/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    ITestByUser,
    ITestByUserQuery,
    ITestResult,
    ITestUserAnswers,
} from '../../common/interfaces/testByUser.interface';
import { TestByUserRepository } from './testByUser.repository';
import { InvalidAnswersTestByUser } from '../../shared/utils/errors/validationError';
import { TestManager } from '../test/test.manager';
import { Global } from '../../common/enums/helpers/Global';
import { getContext } from '../../shared/utils/helpers/context';

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
