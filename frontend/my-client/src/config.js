export const getEnv = (envName) => {
    if (window._env_) {
        return window._env_[envName];
    }
    return undefined;
};

export const isLocal = getEnv('IS_LOCAL') ? getEnv('IS_LOCAL') === 'true' || getEnv('IS_LOCAL') === true : false;
const serverHost = getEnv('SERVER_HOST') ? getEnv('SERVER_HOST') : 'http://localhost';

const config = {
    endpoints: {
        server: serverHost,
        user: {
            api: `${serverHost}/api/user-service/users`,
        },
        item: {
            api: `${serverHost}/api/item-compositor/items`,
        },
        area: {
            api: `${serverHost}/api/item-compositor/areas`,
        },
        mission: {
            api: `${serverHost}/api/user-service/missions`,
        },
        myWiki: {
            api: `${serverHost}/api/news-service/myWiki`,
        },
        content: {
            api: `${serverHost}/api/item-compositor/content`,
        },
    },
    myWiki: {
        wordsPerPage: 6,
    },
    items: {
        itemsPerPage: 6,
    },
    MyNetEmail: 'almog.hamelch@gmail.com',
    debounceTime: 800,
};

export default config;
