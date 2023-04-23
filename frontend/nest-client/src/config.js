export const getEnv = (envName) => {
    if (window._env_) {
        return window._env_[envName];
    }
    return undefined;
};

export const isLocal = getEnv('IS_LOCAL') ? getEnv('IS_LOCAL') === 'true' || getEnv('IS_LOCAL') === true : false;
const mockRoute = 'http://localhost:5000';
const serverRoute = getEnv('SERVER_HOST') ? getEnv('SERVER_HOST') : 'http://localhost:80';
const config = {
    endpoints: {
        user: {
            api: isLocal ? `${mockRoute}/api/user` : `${serverRoute}/api/user-service/user`,
        },
        myWiki: {
            api: isLocal ? `${mockRoute}/api/myWiki` : `${serverRoute}/api/news-service/myWiki`,
            getMyWiki: '/getMyWiki',
            createMyWiki: '/createMyWiki',
            updateMyWiki: '/updateMyWiki',
            deleteMyWiki: '/deleteMyWiki',
        },
        mission: {
            api: isLocal ? `${mockRoute}/api/missions` : `${serverRoute}/api/user-service/missions`,
        },
    },
    myWiki: {
        wordsPerPage: 6,
    },
    debounceTime: 800,
};

export default config;
