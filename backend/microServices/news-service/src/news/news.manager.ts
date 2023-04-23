import { INews, INewsQuery } from '../../common/interfaces/news.interface';
import { NewsRepository } from './news.repository';

export class NewsManager {
    static async getNews(query: INewsQuery): Promise<INews[]> {
        return NewsRepository.getNews(query);
    }

    static async createNews(news: INews): Promise<INews> {
        return NewsRepository.createNews(news);
    }
}
