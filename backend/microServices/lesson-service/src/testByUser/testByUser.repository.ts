import { IUser } from '../../common/interfaces/user.interface';
import {
    ITestByUser,
    ITestByUserQuery,
    ITestResult,
    ITestUserAnswers,
} from '../../common/interfaces/testByUser.interface';
import { ITest, IQuestion } from '../../common/interfaces/test.interface';
import { TestByUserModel } from '../../shared/models/testByUser.model';

export class TestByUserRepository {
    static getEmployeesTests(user: IUser, query: ITestByUserQuery): Promise<ITestResult[]> {
        return TestByUserModel.aggregate([
            ...(query.test
                ? [
                      {
                          $graphLookup: {
                              from: 'users',
                              startWith: '$employees',
                              connectFromField: 'employees',
                              connectToField: '_id',
                              as: 'employees',
                              maxDepth: 5,
                              depthField: 'depth',
                          },
                      },
                      {
                          $match: { test: query.test },
                      },
                      {
                          $match: { user: { $in: user.employees } },
                      },
                  ]
                : []),
            ...(query.user
                ? [
                      {
                          $match: { user: query.user },
                      },
                  ]
                : []),
            {
                $project: {
                    name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
                    title: '$item.title',
                    grade: '$grade',
                },
            },
        ]).exec();
    }

    static createTestByUser(testByUser: ITestUserAnswers, test: ITest): Promise<ITestByUser> {
        const answersLength: number = test.questions.filter(
            (question: IQuestion, index) => question.correctAnswer === testByUser.answers[index]
        ).length;

        return TestByUserModel.findOneAndUpdate(
            { test: testByUser.test, user: testByUser.user },
            {
                ...testByUser,
                grade: Math.round((answersLength / test.questions.length) * 100),
            },
            {
                new: true,
                upsert: true,
            }
        ).exec();
    }
}
