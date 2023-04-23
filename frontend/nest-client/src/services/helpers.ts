import cookies from 'js-cookie';

export const getHeaders: () => any = () => {
    const auth = cookies.get('atom_token');
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
    };
};

export const handleErrors: (response: any) => any = (response: any) => {
    if (!response.ok) {
        throw response.status;
    }

    return response;
};

export const json: (response: any) => any = (response: any) => response.json();

export const createBody: (res: { [keys: string]: any }) => string = (res: { [keys: string]: any }) =>
    JSON.stringify(res);

export const asyncMock: (mock: any) => any = (mock: any) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mock);
        }, 1000);
    });
