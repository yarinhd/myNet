import { IMission } from '../common/interfaces/mission.interface';
import { getHeaders, handleErrors, json } from './helpers';
import config from '../config';

const { api } = config.endpoints.mission;

export default class MissionService {
    static getUserMissionsByWeek = async (userId: string, weekNum: number): Promise<IMission[]> => {
        return fetch(`${api}?director=${userId}&weekNum=${weekNum}`, {
            headers: getHeaders(),
        })
            .then(handleErrors)
            .then(json);
    };
}
