import IUser from '../models/User';
import { getHeaders, handleErrors, json } from './helpers';
import config from '../config';

const { api } = config.endpoints.user;

// eslint-disable-next-line import/prefer-default-export
export const getMyUser: () => Promise<IUser> = () => {
    return fetch(`${api}/me`, {
        headers: getHeaders(),
    })
        .then(handleErrors)

        .then(json);
};
