import { IMyWiki } from 'common-atom/interfaces/myWiki.interface';

export default interface MyWikiCategory {
    category: string;
    docs: IMyWiki[];
}
