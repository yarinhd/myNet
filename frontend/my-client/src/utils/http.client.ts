import { getHeaders, handleErrors, json } from './helpers';

export default class HttpClient {
    static async get(url: string, query: any = {}, isDownloadMode = false) {
        const downloadOptions = isDownloadMode
            ? {
                  responseType: 'blob',
                  responseEncoding: 'binary',
              }
            : {};
        return fetch(`${url}${Object.keys(query).length > 0 ? `?${new URLSearchParams(query as any)}` : ''}`, {
            method: 'GET',
            headers: getHeaders(),
            ...downloadOptions,
        })
            .then(handleErrors)
            .then(json);
    }

    static async post(url: string, body: any = {}, isWithFiles = false) {
        return fetch(`${url}`, {
            method: 'POST',
            body: isWithFiles ? body : JSON.stringify(body),
            headers: getHeaders(isWithFiles),
        })
            .then(handleErrors)
            .then(json);
    }

    static async put(url: string, data: any = {}, isWithFiles = false) {
        return fetch(`${url}`, {
            method: 'PUT',
            body: isWithFiles ? data : JSON.stringify(data),
            headers: getHeaders(isWithFiles),
        })
            .then(handleErrors)
            .then(json);
    }

    static async delete(url: string, query: any = {}) {
        return fetch(`${url}${Object.keys(query).length > 0 ? `?${new URLSearchParams(query as any)}` : ''}`, {
            method: 'DELETE',
            headers: getHeaders(),
        })
            .then(handleErrors)
            .then(json);
    }

    static convertToArrayParams(object: { [key: string]: any[] }) {
        const arrayName = Object.keys(object)[0];
        return object[arrayName].reduce(
            (obj, key, index) => Object.assign(obj, { [`${arrayName}[${index}]`]: key }),
            {}
        );
    }
}
