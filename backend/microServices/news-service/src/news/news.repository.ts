import { INews, INewsQuery } from '../../common/interfaces/news.interface';
import { NewsModel } from '../../shared/models/news.model';

export class NewsRepository {
    static getNews(query: INewsQuery): Promise<INews[]> {
        return NewsModel.find({ area: query.area }).exec();
    }

    static createNews(news: INews): Promise<INews> {
        return NewsModel.create(news);
    }
}
