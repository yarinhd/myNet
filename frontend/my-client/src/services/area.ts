import { IArea } from 'common-atom/interfaces/area.interface';
import config from '../config';
import HttpClient from '../utils/http.client';

const { api } = config.endpoints.area;

export default class AreaService {
    static getAreas = async (): Promise<IArea[]> => {
        return HttpClient.get(`${api}/getAreas`);
    };
}
