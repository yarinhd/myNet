import { IPaginator } from 'common-atom/interfaces/helpers/paginator.interface';
import { IMyWiki, IMyWikiQuery } from 'common-atom/interfaces/myWiki.interface';
import { IdNotFoundError } from 'shared-atom/utils/errors/validationError';
import { MyWikiRepository } from './myWiki.repository';

export class MyWikiManager {
    static async getMyWiki(query: IMyWikiQuery): Promise<IMyWiki[] | IPaginator<IMyWiki>> {
        return MyWikiRepository.getMyWiki(query);
    }

    static async createMyWiki(myWiki: IMyWiki): Promise<IMyWiki> {
        return MyWikiRepository.createMyWiki(myWiki);
    }

    static async updateMyWiki(myWikiId: string, myWiki: Partial<IMyWiki>): Promise<IMyWiki> {
        const updatedMyWiki = await MyWikiRepository.updateMyWiki(myWikiId, myWiki);
        if (!updatedMyWiki) {
            throw new IdNotFoundError('myWikiId');
        }
        return updatedMyWiki;
    }

    static async deleteMyWiki(myWikiId: string): Promise<IMyWiki> {
        const deletedMyWiki = await MyWikiRepository.deleteMyWiki(myWikiId);
        if (!deletedMyWiki) {
            throw new IdNotFoundError('myWikiId');
        }
        return deletedMyWiki;
    }
}
