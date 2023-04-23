import * as queryString from 'query-string';
import { IMyWiki } from '../common/interfaces/myWiki.interface';
import { createBody, getHeaders, handleErrors, json } from './helpers';
import config from '../config';
import { IPaginator } from '../common/interfaces/helpers/paginator.interface';

// eslint-disable-next-line import/prefer-default-export
export const getMyWiki: (skip: number, limit: number, search: string) => Promise<IPaginator<IMyWiki>> = async (
    skip: number,
    limit: number,
    search?: string
) => {
    const query: string = queryString.stringify({ skip, limit, search });
    return fetch(`${config.endpoints.myWiki.api}${config.endpoints.myWiki.getMyWiki}?${query}`, {
        headers: getHeaders(),
    })
        .then(handleErrors)
        .then(json);
};

export const createMyWiki: (myWiki: IMyWiki) => Promise<IMyWiki> = async (myWiki: IMyWiki) => {
    return fetch(`${config.endpoints.myWiki.api}${config.endpoints.myWiki.createMyWiki}`, {
        headers: getHeaders(),
        method: 'POST',
        body: createBody(myWiki),
    })
        .then(handleErrors)
        .then(json);
};

export const editMyWiki: (myWiki: IMyWiki, idMyWiki: string) => Promise<IMyWiki> = async (
    myWiki: IMyWiki,
    idMyWiki: string
) => {
    return fetch(`${config.endpoints.myWiki.api}${config.endpoints.myWiki.updateMyWiki}/${idMyWiki}`, {
        headers: getHeaders(),
        method: 'PUT',
        body: createBody(myWiki),
    })
        .then(handleErrors)
        .then(json);
};

export const deleteMyWiki: (idMyWiki: string) => Promise<void> = async (idMyWiki: string) => {
    return fetch(`${config.endpoints.myWiki.api}${config.endpoints.myWiki.deleteMyWiki}/${idMyWiki}`, {
        headers: getHeaders(),
        method: 'DELETE',
    })
        .then(handleErrors)
        .then(json);
};
