import { IMission } from 'common-atom/interfaces/mission.interface';
import config from '../config';
import HttpClient from '../utils/http.client';

const { api } = config.endpoints.mission;

const DATE_PART = 10;

export default class MissionService {
    static getUserMissions = async (startDate: Date, complitionDate: Date): Promise<IMission[]> => {
        return HttpClient.get(`${api}/getMissions`, {
            startDate: startDate.toISOString().substring(0, DATE_PART),
            endDate: complitionDate.toISOString().substring(0, DATE_PART),
        });
    };
}
