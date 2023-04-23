import { ContentType } from 'common-atom/enums/ContentType';
import { IAllContent } from 'common-atom/interfaces/content.interface';
import config from '../config';
import HttpClient from '../utils/http.client';

const { api } = config.endpoints.content;

export default class ContentService {
    static getContentById: (contentType: ContentType, contentId: string, item?: string) => Promise<IAllContent> =
        async (contentType: ContentType, contentId: string, item?: string) => {
            return HttpClient.get(`${api}/getContentById`, { item, contentType, contentId });
        };
}
